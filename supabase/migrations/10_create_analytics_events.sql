-- Create analytics_events table for real-time activity tracking
-- Migration: 10_create_analytics_events

CREATE TABLE IF NOT EXISTS analytics_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  event_type VARCHAR(100) NOT NULL,
  event_data JSONB DEFAULT '{}',
  page_url VARCHAR(500),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_analytics_events_user_id ON analytics_events(user_id);
CREATE INDEX IF NOT EXISTS idx_analytics_events_event_type ON analytics_events(event_type);
CREATE INDEX IF NOT EXISTS idx_analytics_events_created_at ON analytics_events(created_at);

-- Enable RLS
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Super admins can view all analytics events" ON analytics_events
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.user_id = auth.uid() 
    AND profiles.role = 'super_admin'
  )
);

CREATE POLICY "Users can view their own analytics events" ON analytics_events
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own analytics events" ON analytics_events
FOR INSERT WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

-- Add some test analytics events
INSERT INTO analytics_events (user_id, event_type, event_data, page_url, created_at) VALUES
((SELECT user_id FROM profiles WHERE role = 'super_admin' LIMIT 1), 'page_view', '{"page": "dashboard"}', '/dashboard', NOW() - INTERVAL '1 hour'),
((SELECT user_id FROM profiles WHERE role = 'super_admin' LIMIT 1), 'login', '{"method": "email"}', '/login', NOW() - INTERVAL '2 hours'),
((SELECT user_id FROM profiles WHERE role = 'super_admin' LIMIT 1), 'page_view', '{"page": "jobs"}', '/jobs', NOW() - INTERVAL '3 hours'),
((SELECT user_id FROM profiles WHERE role = 'super_admin' LIMIT 1), 'job_application', '{"job_id": "test-job-1"}', '/jobs/test-job-1', NOW() - INTERVAL '4 hours'),
((SELECT user_id FROM profiles WHERE role = 'super_admin' LIMIT 1), 'profile_update', '{}', '/profile/edit', NOW() - INTERVAL '5 hours'),
((SELECT user_id FROM profiles WHERE role = 'super_admin' LIMIT 1), 'error', '{"error": "Network timeout"}', '/dashboard', NOW() - INTERVAL '6 hours'),
((SELECT user_id FROM profiles WHERE role = 'super_admin' LIMIT 1), 'message_sent', '{"conversation_id": "test-conv-1"}', '/messages', NOW() - INTERVAL '7 hours'),
((SELECT user_id FROM profiles WHERE role = 'super_admin' LIMIT 1), 'page_view', '{"page": "admin"}', '/admin', NOW() - INTERVAL '8 hours');

-- Add more test events for other users
INSERT INTO analytics_events (user_id, event_type, event_data, page_url, created_at) 
SELECT 
  p.user_id,
  CASE (random() * 5)::int
    WHEN 0 THEN 'page_view'
    WHEN 1 THEN 'login'
    WHEN 2 THEN 'job_application'
    WHEN 3 THEN 'profile_update'
    WHEN 4 THEN 'message_sent'
    ELSE 'page_view'
  END,
  CASE (random() * 5)::int
    WHEN 0 THEN '{"page": "dashboard"}'
    WHEN 1 THEN '{"method": "email"}'
    WHEN 2 THEN '{"job_id": "test-job-' || (random() * 10)::int || '"}'
    WHEN 3 THEN '{}'
    WHEN 4 THEN '{"conversation_id": "test-conv-' || (random() * 5)::int || '"}'
    ELSE '{"page": "jobs"}'
  END::jsonb,
  CASE (random() * 5)::int
    WHEN 0 THEN '/dashboard'
    WHEN 1 THEN '/login'
    WHEN 2 THEN '/jobs'
    WHEN 3 THEN '/profile/edit'
    WHEN 4 THEN '/messages'
    ELSE '/jobs'
  END,
  NOW() - (random() * INTERVAL '7 days')
FROM profiles p
WHERE p.role != 'super_admin'
LIMIT 20;
