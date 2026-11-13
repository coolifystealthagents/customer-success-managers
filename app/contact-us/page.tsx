import type {Metadata} from 'next';
import {ContactExperience} from '../experience';
import {LeadForm} from '@/components/LeadForm';
export const metadata:Metadata={title:'Contact Us',description:'Discuss your support needs in a free consultation.',alternates:{canonical:'/contact-us'}};
export default function Page(){return <ContactExperience><LeadForm source="contact-page-consultation"/></ContactExperience>}
