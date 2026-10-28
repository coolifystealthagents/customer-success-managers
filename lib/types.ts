export type Service = {
  slug: string; name: string; short: string; intro: string; tasks: string[];
  outcomes: string[]; workflow: string[]; boundaries: string[]; measures: string[];
};
export type ArticleSection = { heading: string; paragraphs: string[] };
export type FAQ = { q: string; a: string };
export type BlogPost = { slug:string;title:string;description:string;category:string;publishedAt:string;readTime:string;image?:string;sections:ArticleSection[];faq:FAQ[];internalService:string;internalSibling:string;source:{label:string;url:string} };
export type ResearchPost = { slug:string;title:string;summary:string;cluster:string;publishedAt:string;image?:string;finding:string;methodology?:string[];findings?:string[];sections?:ArticleSection[];sources:{label:string;publisher?:string;url:string;checkedAt?:string}[] };
export type SiteConfig = { name:string;domain:string;siteId:string;niche:string;audience:string;design:string;eyebrow:string;hero:string;heroAccent:string;heroBody:string;manifesto:string;primary:string;secondary:string;accent:string;canvas:string;ink:string;displayFont:string;bodyFont:string;heroImage:string;heroAlt:string;services:Service[];categories:string[];principles:string[];sources:{label:string;url:string}[] };
