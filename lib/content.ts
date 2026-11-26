import { site } from './site';
import type { BlogPost, ResearchPost } from './types';

// Existing editorial content removed at the site owner's request on 2026-11-26.
// Git history preserves the previous registry for recovery.
export const blogPosts: BlogPost[] = [];
export const researchPosts: ResearchPost[] = [];

export const nav = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/contact-us', label: 'Contact Us' }
];

export function serviceBySlug(slug: string) { return site.services.find((service) => service.slug === slug); }
export function blogBySlug(slug: string) { return blogPosts.find((post) => post.slug === slug); }
export function researchBySlug(slug: string) { return researchPosts.find((post) => post.slug === slug); }
