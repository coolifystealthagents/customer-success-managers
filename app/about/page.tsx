import type {Metadata} from 'next';
import {AboutExperience} from '../experience';
export const metadata:Metadata={title:"About",description:"Give your customer success team the operational support to stay present. Organize onboarding, account signals, reviews, and follow-up around the relationships you want to build.",alternates:{canonical:"/about"}};
export default function Page(){return <AboutExperience/>}
