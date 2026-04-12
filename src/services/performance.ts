
/**
 * Utility to measure and report performance metrics
 */

// Types for performance metrics
interface PerformanceMetrics {
  timeToFirstByte?: number;
  firstContentfulPaint?: number;
  domContentLoaded?: number;
  windowLoaded?: number;
  largestContentfulPaint?: number;
  firstInputDelay?: number;
  cumulativeLayoutShift?: number;
}

/**
 * Collect performance metrics that are useful for monitoring site speed
 */
export const collectPerformanceMetrics = (): PerformanceMetrics => {
  const metrics: PerformanceMetrics = {};
  
  // Get navigation timing data if available
  if (performance && 'getEntriesByType' in performance) {
    const navigationEntries = performance.getEntriesByType('navigation');
    if (navigationEntries && navigationEntries.length > 0) {
      const nav = navigationEntries[0] as PerformanceNavigationTiming;
      
      // Time to First Byte (TTFB)
      metrics.timeToFirstByte = nav.responseStart - nav.requestStart;
      
      // DOMContentLoaded time
      metrics.domContentLoaded = nav.domContentLoadedEventEnd - nav.fetchStart;
      
      // Window load time
      metrics.windowLoaded = nav.loadEventEnd - nav.fetchStart;
    }
    
    // First Contentful Paint (FCP)
    const paintEntries = performance.getEntriesByType('paint');
    const fcpEntry = paintEntries.find(entry => entry.name === 'first-contentful-paint');
    if (fcpEntry) {
      metrics.firstContentfulPaint = fcpEntry.startTime;
    }
  }
  
  return metrics;
};

/**
 * Report collected metrics to analytics
 */
export const reportPerformanceMetrics = (metrics: PerformanceMetrics) => {
  // In a real app, send these to your analytics service
  console.debug('Performance metrics:', metrics);
};

/**
 * Initialize performance monitoring
 */
export const initializePerformanceMonitoring = () => {
  // Collect basic metrics when page loads
  window.addEventListener('load', () => {
    // Use requestIdleCallback or setTimeout to not block main thread
    const report = () => {
      const metrics = collectPerformanceMetrics();
      reportPerformanceMetrics(metrics);
    };
    
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(report);
    } else {
      setTimeout(report, 1000);
    }
  });
  
  // Optimize image loading by changing priority based on viewport
  const optimizeImageLoading = () => {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
      const rect = img.getBoundingClientRect();
      // If image is close to viewport, change loading strategy
      if (rect.top < window.innerHeight + 300) {
        img.setAttribute('loading', 'eager');
      }
    });
  };
  
  // Run image optimization on scroll (throttled)
  let scrollTimeout: number | null = null;
  window.addEventListener('scroll', () => {
    if (scrollTimeout === null) {
      scrollTimeout = window.setTimeout(() => {
        optimizeImageLoading();
        scrollTimeout = null;
      }, 200);
    }
  });
};

export default {
  collectPerformanceMetrics,
  reportPerformanceMetrics,
  initializePerformanceMonitoring
};
