'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

// Get user's current subscription
export async function getUserSubscription(userId: string) {
  const supabase = await createClient();
  
  try {
    const { data, error } = await supabase
      .from('user_subscriptions')
      .select(`
        id,
        user_id,
        plan_id,
        status,
        current_period_start,
        current_period_end,
        trial_end,
        subscription_plans(
          id,
          name,
          tier,
          price_eur,
          max_job_postings,
          analytics_access,
          recruiter_dashboard,
          priority_support,
          featured_listings,
          bulk_operations,
          api_access,
          custom_branding,
          sso_enabled
        )
      `)
      .eq('user_id', userId)
      .eq('status', 'active')
      .single();

    if (error) {
      console.error('Error fetching subscription:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error in getUserSubscription:', error);
    return null;
  }
}

// Check if user has access to premium feature
export async function checkFeatureAccess(userId: string, featureName: string): Promise<boolean> {
  const subscription = await getUserSubscription(userId);
  
  if (!subscription) {
    return false;
  }

  const plan = subscription.subscription_plans as any;
  
  // Map feature names to plan properties
  const featureMap: Record<string, string> = {
    'analytics': 'analytics_access',
    'recruiter_dashboard': 'recruiter_dashboard',
    'priority_support': 'priority_support',
    'featured_listings': 'featured_listings',
    'bulk_operations': 'bulk_operations',
    'api_access': 'api_access',
    'custom_branding': 'custom_branding',
    'sso_enabled': 'sso_enabled',
  };

  const featureKey = featureMap[featureName];
  if (!featureKey) {
    return false;
  }

  const hasAccess = plan && plan[featureKey] === true;
  
  if (hasAccess) {
    // Log feature access
    const supabase = await createClient();
    try {
      await supabase.from('feature_access_log').insert({
        user_id: userId,
        feature_name: featureName,
        accessed_at: new Date().toISOString(),
      });
    } catch (err) {
      console.error('Error logging feature access:', err);
    }
  }

  return hasAccess;
}

// Create subscription for user
export async function createSubscription(userId: string, planId: string) {
  const supabase = await createClient();
  
  try {
    // Get plan details
    const { data: plan, error: planError } = await supabase
      .from('subscription_plans')
      .select('*')
      .eq('id', planId)
      .single();

    if (planError || !plan) {
      return { error: 'Plan not found' };
    }

    // Calculate subscription dates
    const currentDate = new Date();
    const endDate = new Date(currentDate);
    endDate.setDate(endDate.getDate() + plan.billing_period_days);

    // Create subscription
    const { data, error } = await supabase
      .from('user_subscriptions')
      .insert({
        user_id: userId,
        plan_id: planId,
        status: 'active',
        current_period_start: currentDate.toISOString(),
        current_period_end: endDate.toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating subscription:', error);
      return { error: 'Failed to create subscription' };
    }

    revalidatePath('/dashboard');
    return { data };
  } catch (error) {
    console.error('Error in createSubscription:', error);
    return { error: 'An error occurred' };
  }
}

// Upgrade subscription
export async function upgradeSubscription(userId: string, newPlanId: string) {
  const supabase = await createClient();
  
  try {
    // Get current subscription
    const { data: currentSub, error: getError } = await supabase
      .from('user_subscriptions')
      .select('id, current_period_start, current_period_end')
      .eq('user_id', userId)
      .eq('status', 'active')
      .single();

    if (getError || !currentSub) {
      return { error: 'No active subscription found' };
    }

    // Get new plan details
    const { data: newPlan, error: planError } = await supabase
      .from('subscription_plans')
      .select('*')
      .eq('id', newPlanId)
      .single();

    if (planError || !newPlan) {
      return { error: 'New plan not found' };
    }

    // Update subscription
    const { data, error } = await supabase
      .from('user_subscriptions')
      .update({
        plan_id: newPlanId,
        updated_at: new Date().toISOString(),
      })
      .eq('id', currentSub.id)
      .select()
      .single();

    if (error) {
      console.error('Error upgrading subscription:', error);
      return { error: 'Failed to upgrade subscription' };
    }

    revalidatePath('/dashboard');
    return { data };
  } catch (error) {
    console.error('Error in upgradeSubscription:', error);
    return { error: 'An error occurred' };
  }
}

// Get premium analytics
export async function getPremiumAnalytics(userId: string) {
  const supabase = await createClient();
  
  // Check if user has analytics access
  const hasAccess = await checkFeatureAccess(userId, 'analytics');
  if (!hasAccess) {
    return { error: 'Feature not available with current plan' };
  }

  try {
    const { data, error } = await supabase
      .from('premium_analytics')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) {
      console.error('Error fetching analytics:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error in getPremiumAnalytics:', error);
    return null;
  }
}

// Update premium analytics
export async function updatePremiumAnalytics(userId: string, updates: any) {
  const supabase = await createClient();
  
  try {
    const { data, error } = await supabase
      .from('premium_analytics')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('user_id', userId)
      .select()
      .single();

    if (error) {
      console.error('Error updating analytics:', error);
      return { error: 'Failed to update analytics' };
    }

    return { data };
  } catch (error) {
    console.error('Error in updatePremiumAnalytics:', error);
    return { error: 'An error occurred' };
  }
}

// Get all available subscription plans
export async function getSubscriptionPlans() {
  const supabase = await createClient();
  
  try {
    const { data, error } = await supabase
      .from('subscription_plans')
      .select('*')
      .order('price_eur', { ascending: true });

    if (error) {
      console.error('Error fetching plans:', error);
      return [];
    }

    return data;
  } catch (error) {
    console.error('Error in getSubscriptionPlans:', error);
    return [];
  }
}

// Cancel subscription
export async function cancelSubscription(userId: string) {
  const supabase = await createClient();
  
  try {
    const now = new Date();
    
    const { data, error } = await supabase
      .from('user_subscriptions')
      .update({
        status: 'cancelled',
        cancel_at: now.toISOString(),
        canceled_at: now.toISOString(),
        updated_at: now.toISOString(),
      })
      .eq('user_id', userId)
      .eq('status', 'active')
      .select()
      .single();

    if (error) {
      console.error('Error canceling subscription:', error);
      return { error: 'Failed to cancel subscription' };
    }

    revalidatePath('/dashboard');
    return { data };
  } catch (error) {
    console.error('Error in cancelSubscription:', error);
    return { error: 'An error occurred' };
  }
}
