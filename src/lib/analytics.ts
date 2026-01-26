import { supabase } from './supabase';
import { PageView, TabView, ClickEvent } from '@/types/analytics';

// Track page view
export async function trackPageView(data: {
  page_path: string;
  page_title: string;
  referrer?: string;
  user_agent?: string;
  ip_address?: string;
  country?: string;
  city?: string;
  device_type?: string;
  browser?: string;
  duration?: number;
}) {
  try {
    const { error } = await supabase
      .from('page_views')
      .insert([{
        page_path: data.page_path,
        page_title: data.page_title,
        referrer: data.referrer || null,
        user_agent: data.user_agent || null,
        ip_address: data.ip_address || null,
        country: data.country || null,
        city: data.city || null,
        device_type: data.device_type || null,
        browser: data.browser || null,
        duration: data.duration || null,
      }]);

    if (error) {
      console.error('Error tracking page view:', error);
    }
  } catch (error) {
    console.error('Error tracking page view:', error);
  }
}

// Update page view duration
export async function updatePageViewDuration(pageViewId: string, duration: number) {
  try {
    const { error } = await supabase
      .from('page_views')
      .update({ duration })
      .eq('id', pageViewId);

    if (error) {
      console.error('Error updating page view duration:', error);
    }
  } catch (error) {
    console.error('Error updating page view duration:', error);
  }
}

// Track tab view
export async function trackTabView(pagePath: string, tabName: string) {
  try {
    const { error } = await supabase
      .from('tab_views')
      .insert([{
        page_path: pagePath,
        tab_name: tabName,
      }]);

    if (error) {
      console.error('Error tracking tab view:', error);
    }
  } catch (error) {
    console.error('Error tracking tab view:', error);
  }
}

// Track click event
export async function trackClick(data: {
  page_path: string;
  element_type: string;
  element_id?: string;
  element_text?: string;
}) {
  try {
    const { error } = await supabase
      .from('click_events')
      .insert([{
        page_path: data.page_path,
        element_type: data.element_type,
        element_id: data.element_id || null,
        element_text: data.element_text || null,
      }]);

    if (error) {
      console.error('Error tracking click:', error);
    }
  } catch (error) {
    console.error('Error tracking click:', error);
  }
}

// Get user location from IP (simplified - in production use a proper service)
export async function getUserLocation(ip?: string): Promise<{ country: string | null; city: string | null }> {
  if (!ip || ip === 'localhost' || ip.startsWith('127.') || ip.startsWith('192.168.')) {
    return { country: null, city: null };
  }

  try {
    // Using a free IP geolocation service
    const response = await fetch(`https://ipapi.co/${ip}/json/`);
    const data = await response.json();
    return {
      country: data.country_name || null,
      city: data.city || null,
    };
  } catch (error) {
    console.error('Error getting user location:', error);
    return { country: null, city: null };
  }
}

// Parse user agent
export function parseUserAgent(userAgent: string): { device_type: string; browser: string } {
  const ua = userAgent.toLowerCase();
  
  let device_type = 'desktop';
  if (/mobile|android|iphone|ipad/.test(ua)) {
    device_type = 'mobile';
  } else if (/tablet|ipad/.test(ua)) {
    device_type = 'tablet';
  }

  let browser = 'unknown';
  if (ua.includes('chrome') && !ua.includes('edg')) {
    browser = 'chrome';
  } else if (ua.includes('firefox')) {
    browser = 'firefox';
  } else if (ua.includes('safari') && !ua.includes('chrome')) {
    browser = 'safari';
  } else if (ua.includes('edg')) {
    browser = 'edge';
  } else if (ua.includes('opera') || ua.includes('opr')) {
    browser = 'opera';
  }

  return { device_type, browser };
}
