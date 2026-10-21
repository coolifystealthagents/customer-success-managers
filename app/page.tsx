import type { Metadata } from 'next';import { HomePage } from '@/components/Marketing';
export const metadata:Metadata={alternates:{canonical:'/'},openGraph:{title:'Customer Success Managers',description:'Remote customer success staffing for visible journeys, owned handoffs, and reviewable follow-through.',images:['/hero.png']}};
export default function Page(){return <HomePage/>}
