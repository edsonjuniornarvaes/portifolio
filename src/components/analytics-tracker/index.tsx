"use client";

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { trackPageView, updatePageViewDuration, trackClick, getUserLocation, parseUserAgent } from '@/lib/analytics';
import { supabase } from '@/lib/supabase';

export default function AnalyticsTracker() {
  const pathname = usePathname();
  const startTimeRef = useRef<number>(Date.now());
  const pageViewIdRef = useRef<string | null>(null);
  const isVisibleRef = useRef<boolean>(true);

  useEffect(() => {
    // Não rastrear páginas admin
    if (pathname?.startsWith('/adminaccess')) {
      return;
    }

    const track = async () => {
      // Reset start time
      startTimeRef.current = Date.now();
      isVisibleRef.current = true;

      // Get user info
      const userAgent = navigator.userAgent;
      const { device_type, browser } = parseUserAgent(userAgent);
      const referrer = document.referrer || undefined;
      
      // Get IP (simplified - in production this should come from server)
      let ip: string | undefined;
      try {
        const ipResponse = await fetch('https://api.ipify.org?format=json');
        const ipData = await ipResponse.json();
        ip = ipData.ip;
      } catch (error) {
        console.error('Error getting IP:', error);
      }

      // Get location
      const location = ip ? await getUserLocation(ip) : { country: null, city: null };

      // Track page view and get ID
      try {
        const { data, error } = await supabase
          .from('page_views')
          .insert([{
            page_path: pathname || '/',
            page_title: document.title,
            referrer: referrer || null,
            user_agent: userAgent || null,
            ip_address: ip || null,
            country: location.country || null,
            city: location.city || null,
            device_type: device_type || null,
            browser: browser || null,
            duration: null,
          }])
          .select('id')
          .single();

        if (data) {
          pageViewIdRef.current = data.id;
        }

        if (error) {
          console.error('Error tracking page view:', error);
        }
      } catch (error) {
        console.error('Error tracking page view:', error);
      }
    };

    track();

    // Track time when page becomes hidden
    const handleVisibilityChange = () => {
      if (document.hidden) {
        isVisibleRef.current = false;
        // Calculate duration when page becomes hidden
        const duration = Math.floor((Date.now() - startTimeRef.current) / 1000);
        if (pageViewIdRef.current && duration > 0) {
          updatePageViewDuration(pageViewIdRef.current, duration);
        }
      } else {
        // Reset start time when page becomes visible again
        startTimeRef.current = Date.now();
        isVisibleRef.current = true;
      }
    };

    // Track time when user leaves the page
    const handleBeforeUnload = () => {
      if (isVisibleRef.current && pageViewIdRef.current) {
        const duration = Math.floor((Date.now() - startTimeRef.current) / 1000);
        if (duration > 0) {
          // Use sendBeacon for reliable tracking on page unload
          navigator.sendBeacon(
            '/api/admin/track-duration',
            JSON.stringify({
              id: pageViewIdRef.current,
              duration,
            })
          );
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      // Calculate and save duration when component unmounts (page change)
      if (isVisibleRef.current && pageViewIdRef.current) {
        const duration = Math.floor((Date.now() - startTimeRef.current) / 1000);
        if (duration > 0) {
          updatePageViewDuration(pageViewIdRef.current, duration);
        }
      }
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [pathname]);

  useEffect(() => {
    // Não rastrear páginas admin
    if (pathname?.startsWith('/adminaccess')) {
      return;
    }

    // Track clicks on links and buttons
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const elementType = target.tagName.toLowerCase();
      
      if (['a', 'button', 'div', 'span'].includes(elementType)) {
        const elementId = target.id || undefined;
        const elementText = target.textContent?.trim().substring(0, 100) || undefined;
        
        trackClick({
          page_path: pathname || '/',
          element_type: elementType,
          element_id: elementId,
          element_text: elementText,
        });
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [pathname]);

  return null;
}
