"use client";
import { useEffect } from 'react';

// Basic Web Vitals capture without Next built-in export (App Router only context)
export function WebVitals() {
  useEffect(() => {
    if (!('PerformanceObserver' in window)) return;
    const send = (name: string, value: number, id: string) => {
      const evt = { event: 'web_vital', name, value: Math.round(name === 'CLS' ? value * 1000 : value), id };
      // GA4
      // @ts-ignore
      if (window.gtag) {
        // @ts-ignore
        window.gtag('event', name, { value: evt.value, event_category: 'Web Vitals', event_label: id, non_interaction: true });
      }
      // Clarity custom
      // @ts-ignore
      if (window.clarity) {
        // @ts-ignore
        window.clarity('set', name, evt.value);
      }
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.log('[WebVital]', evt);
      }
    };
    try {
      const po = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          // @ts-ignore
          if (entry.name === 'largest-contentful-paint') send('LCP', entry.renderTime || entry.loadTime || entry.startTime, entry.id);
          // @ts-ignore
          if (entry.entryType === 'layout-shift' && !entry.hadRecentInput) send('CLS', entry.value, entry.id);
          // @ts-ignore
          if (entry.name === 'first-input') send('FID', entry.processingStart - entry.startTime, entry.id);
          // INP poly via Event Timing entries marked as 'interaction'
          // @ts-ignore
          if (entry.entryType === 'event' && entry.duration && entry.interactionId) send('INP', entry.duration, String(entry.interactionId));
        }
      });
      po.observe({ type: 'largest-contentful-paint', buffered: true });
      po.observe({ type: 'layout-shift', buffered: true });
      po.observe({ type: 'first-input', buffered: true });
      // Event Timing (experimental) - may fail silently
      // @ts-ignore
      if (PerformanceEventTiming) po.observe({ type: 'event', buffered: true });
    } catch (e) {
      // ignore
    }
  }, []);
  return null;
}
