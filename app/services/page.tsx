import type {Metadata} from 'next';
import {ServicesExperience} from '../experience';
export const metadata:Metadata={title:"Services",description:"Give your customer success team the operational support to stay present. Organize onboarding, account signals, reviews, and follow-up around the relationships you want to build.",alternates:{canonical:"/services"}};
export default function Page(){return <ServicesExperience/>}
