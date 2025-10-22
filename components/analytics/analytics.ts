'use client';

/**
 * Analytics helper for tracking custom events
 * Supports Google Analytics 4 and Microsoft Clarity
 */


export const trackEvent = (eventName: string, params?: Record<string, any>) => {
  // Google Analytics 4
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, params);
  }

  // Microsoft Clarity (automatically tracks events)
  if (typeof window !== 'undefined' && (window as any).clarity) {
    (window as any).clarity('set', eventName, params);
  }
};

export const trackQuoteStep = (step: number, insuranceType?: string) => {
  trackEvent('quote_step_complete', {
    step,
    insurance_type: insuranceType,
  });
};

export const trackQuoteSubmit = (insuranceType: string) => {
  trackEvent('quote_submit', {
    insurance_type: insuranceType,
  });
};

export const trackPageView = (url: string) => {
  trackEvent('page_view', {
    page_path: url,
  });
};

export const trackFormSubmit = (formName: string) => {
  trackEvent('form_submit', {
    form_name: formName,
  });
};

export const trackPhoneClick = (location: string) => {
  trackEvent('phone_click', {
    location,
  });
};

export const trackEmailClick = (location: string) => {
  trackEvent('email_click', {
    location,
  });
};

export const trackCTAClick = (ctaName: string, location: string) => {
  trackEvent('cta_click', {
    cta_name: ctaName,
    location,
  });
};
