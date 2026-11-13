import type {Metadata} from 'next';
import {LibraryExperience} from '../experience';
export const metadata:Metadata={title:"Blog",description:"Give your customer success team the operational support to stay present. Organize onboarding, account signals, reviews, and follow-up around the relationships you want to build.",alternates:{canonical:"/blog"}};
export default function Page(){return <LibraryExperience kind="blog"/>}
