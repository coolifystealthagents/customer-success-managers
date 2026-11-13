'use client';
import {useGSAP} from '@gsap/react';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger,useGSAP);
export function ExperienceMotion(){useGSAP(()=>{const mm=gsap.matchMedia();mm.add('(prefers-reduced-motion: no-preference) and (min-width: 1000px)',()=>{document.querySelectorAll('.nx-story .nx-reveal-copy,.rx-story-copy').forEach(el=>{gsap.fromTo(el,{opacity:.65},{opacity:1,scrollTrigger:{trigger:el,start:'top 90%',end:'top 50%',scrub:true}})});document.querySelectorAll('.nx-reading .nx-photo img,.nx-team .nx-photo img').forEach(el=>gsap.fromTo(el,{scale:1.035},{scale:1,ease:'none',scrollTrigger:{trigger:el,start:'top bottom',end:'center center',scrub:true}}));document.querySelectorAll('.nx-closing .nx-control-panels article,.nx-success .nx-control-panels article').forEach((el,i)=>gsap.fromTo(el,{y:16+i*5},{y:0,ease:'none',scrollTrigger:{trigger:el,start:'top 95%',end:'top 65%',scrub:true}}));});return()=>mm.revert()},[]);return null}
