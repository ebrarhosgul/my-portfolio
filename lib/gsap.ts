'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { SplitText } from 'gsap/all';

let isRegistered = false;

export function registerGSAPPlugins() {
  if (typeof window === 'undefined' || isRegistered) return;

  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, SplitText);
  isRegistered = true;
}

if (typeof window !== 'undefined') {
  registerGSAPPlugins();
}

export { gsap, ScrollTrigger, ScrollToPlugin, SplitText };
