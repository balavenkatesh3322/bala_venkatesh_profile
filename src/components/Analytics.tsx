import { useEffect } from 'react';

declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
  }
}

export default function Analytics() {
  const meta = import.meta as any;
  const measurementId = meta.env?.VITE_GA_MEASUREMENT_ID;

  useEffect(() => {
    if (!measurementId) {
      console.log('📊 [Analytics] No VITE_GA_MEASUREMENT_ID provided. Skipping Google Analytics setup.');
      return;
    }

    // 1. Inject the Google Analytics script
    const scriptId = 'google-analytics-script';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
      document.head.appendChild(script);

      // 2. Initialize the dataLayer and gtag function
      window.dataLayer = window.dataLayer || [];
      window.gtag = function gtag() {
        window.dataLayer.push(arguments);
      };
      
      window.gtag('js', new Date());
      window.gtag('config', measurementId, {
        send_page_view: false // Disable default pageview, we will manually handle hash changes
      });
      
      console.log(`📊 [Analytics] Google Analytics initialized successfully with ID: ${measurementId}`);
    }

    // 3. Track current page & listen to hash changes for SPA compatibility
    const trackPageView = () => {
      const path = window.location.pathname + window.location.hash;
      const title = document.title;

      if (window.gtag) {
        window.gtag('event', 'page_view', {
          page_path: path || '/',
          page_title: title,
          page_location: window.location.href
        });
        console.log(`📊 [Analytics] Tracked page view: ${path}`);
      }
    };

    // Track initial page view
    trackPageView();

    // Listen to hash changes and state changes
    window.addEventListener('hashchange', trackPageView);
    window.addEventListener('popstate', trackPageView);

    return () => {
      window.removeEventListener('hashchange', trackPageView);
      window.removeEventListener('popstate', trackPageView);
    };
  }, [measurementId]);

  return null; // This component runs purely as a background tracker
}
