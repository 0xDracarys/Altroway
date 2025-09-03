import { createClient } from '@/lib/supabase/client'

export interface AnalyticsEvent {
  event_type: string
  event_data?: Record<string, any>
  page_url?: string
  user_id?: string
}

export class Analytics {
  private supabase = createClient()

  async track(event: AnalyticsEvent) {
    try {
      // Get current user
      const { data: { user } } = await this.supabase.auth.getUser()
      
      // Get current page URL
      const pageUrl = typeof window !== 'undefined' ? window.location.pathname : event.page_url

      // Prepare event data
      const eventData = {
        user_id: user?.id || null,
        event_type: event.event_type,
        event_data: event.event_data || {},
        page_url: pageUrl,
        created_at: new Date().toISOString()
      }

      // Insert into analytics_events table
      const { error } = await this.supabase
        .from('analytics_events')
        .insert(eventData)

      if (error) {
        console.error('Analytics tracking error:', error)
      }
    } catch (error) {
      console.error('Analytics tracking failed:', error)
    }
  }

  // Convenience methods for common events
  async trackPageView(pageUrl?: string) {
    await this.track({
      event_type: 'page_view',
      page_url: pageUrl
    })
  }

  async trackUserAction(action: string, data?: Record<string, any>) {
    await this.track({
      event_type: 'user_action',
      event_data: { action, ...data }
    })
  }

  async trackError(error: string, data?: Record<string, any>) {
    await this.track({
      event_type: 'error',
      event_data: { error, ...data }
    })
  }

  async trackLogin(method: string = 'email') {
    await this.track({
      event_type: 'login',
      event_data: { method }
    })
  }

  async trackLogout() {
    await this.track({
      event_type: 'logout'
    })
  }

  async trackJobApplication(jobId: string) {
    await this.track({
      event_type: 'job_application',
      event_data: { job_id: jobId }
    })
  }

  async trackJobCreation(jobId: string) {
    await this.track({
      event_type: 'job_creation',
      event_data: { job_id: jobId }
    })
  }

  async trackProfileUpdate() {
    await this.track({
      event_type: 'profile_update'
    })
  }

  async trackMessageSent(conversationId: string) {
    await this.track({
      event_type: 'message_sent',
      event_data: { conversation_id: conversationId }
    })
  }
}

// Create a singleton instance
export const analytics = new Analytics()

// Auto-track page views
if (typeof window !== 'undefined') {
  // Track initial page view
  analytics.trackPageView()

  // Track page changes (for SPA navigation)
  let currentPath = window.location.pathname
  const observer = new MutationObserver(() => {
    if (window.location.pathname !== currentPath) {
      currentPath = window.location.pathname
      analytics.trackPageView()
    }
  })

  observer.observe(document.body, {
    childList: true,
    subtree: true
  })
}
