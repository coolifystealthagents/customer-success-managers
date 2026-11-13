import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import d from '../../refresh-data.json';
import {ServiceExperience} from '../../experience';
export function generateStaticParams(){return d.services.map(s=>({slug:s.slug}))}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;const s=d.services.find(s=>s.slug===slug);return s?{title:s.title,description:s.description,alternates:{canonical:'/services/'+s.slug},openGraph:{images:[s.image]}}:{}}
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const s=d.services.find(s=>s.slug===slug);if(!s)notFound();return <ServiceExperience s={s}/>}
