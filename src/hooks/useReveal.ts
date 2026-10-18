import { useEffect } from 'react';

/**
 * Hides reveal targets only after the observer is ready.
 * If IntersectionObserver is missing or setup fails, text stays visible.
 */
export function useReveal() {
  useEffect(() => {
    const root = document.documentElement;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduced || !('IntersectionObserver' in window)) return;

    let observer: IntersectionObserver;
    try {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          });
        },
        { threshold: 0.1 },
      );
    } catch {
      return;
    }

    root.classList.add('js');
    document.querySelectorAll('.reveal').forEach((node) => observer.observe(node));

    return () => {
      observer.disconnect();
      root.classList.remove('js');
    };
  }, []);
}
