'use client';
import { useEffect, useState } from 'react';
import Mobile from './Mobile';
import Desktop from './Desktop';

export default function SkillsManifesto() {
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const checkSize = () => setIsDesktop(window.innerWidth >= 768);

    checkSize();

    window.addEventListener('resize', checkSize);

    return () => window.removeEventListener('resize', checkSize);
  }, []);

  return isDesktop ? <Desktop /> : <Mobile />;
}
