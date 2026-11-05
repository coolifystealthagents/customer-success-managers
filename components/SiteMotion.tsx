'use client';

import { useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function SiteMotion() {
  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-motion-image]').forEach((item) => {
        gsap.fromTo(item, { autoAlpha: 0, scale: 1.035 }, { autoAlpha: 1, scale: 1, duration: 0.8, ease: 'power2.out', scrollTrigger: { trigger: item, start: 'top 88%', once: true } });
      });
      gsap.utils.toArray<HTMLElement>('[data-stack-card]').forEach((item, index) => {
        gsap.fromTo(item, { y: 28, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.55, delay: Math.min(index * 0.05, 0.25), ease: 'power2.out', scrollTrigger: { trigger: item, start: 'top 92%', once: true } });
      });
    });
    return () => context.revert();
  }, []);
  return null;
}
