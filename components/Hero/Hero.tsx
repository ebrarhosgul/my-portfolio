'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, SplitText } from '@/lib/gsap';
import { FaLinkedinIn, FaGithub } from 'react-icons/fa';
import dynamic from 'next/dynamic';
import { isMobileDevice, prefersReducedMotion } from '@/lib';
import { trackEvent } from '@/lib/analytics';

const Beams = dynamic(() => import('./Beams'), {
  ssr: false,
  loading: () => (
    <div
      className="w-full h-full bg-black opacity-50"
      role="presentation"
      style={{
        background:
          'radial-gradient(circle at 50% 50%, #0a0a0a 0%, #000000 100%)',
      }}
    />
  ),
});

const Hero = () => {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const reducedMotion = prefersReducedMotion();

      gsap.set('.hero-content', { autoAlpha: 1 });

      if (reducedMotion) {
        gsap.set(
          [
            '.name-badge',
            '.title',
            '.subtitle',
            '.cta-buttons',
            '.hero-social-container',
          ],
          {
            opacity: 1,
            y: 0,
            scale: 1,
          },
        );
        return;
      }

      const titleSplit = new SplitText('.title', { type: 'lines' });
      const subtitleSplit = new SplitText('.subtitle', { type: 'lines' });

      const tl = gsap.timeline({ delay: 0.2 });

      tl.from('.name-badge', {
        y: -20,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });

      tl.from(
        titleSplit.lines,
        {
          yPercent: 100,
          opacity: 0,
          duration: 1.2,
          stagger: 0.1,
          ease: 'power4.out',
        },
        '-=0.4',
      );

      tl.from(
        subtitleSplit.lines,
        {
          y: 20,
          opacity: 0,
          duration: 1,
          stagger: 0.05,
          ease: 'power2.out',
        },
        '-=0.8',
      );

      tl.from(
        '.cta-buttons',
        {
          y: 20,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
        },
        '-=0.6',
      );

      tl.from(
        '.hero-social-container',
        {
          scale: 0,
          opacity: 0,
          duration: 0.5,
          ease: 'circ.inOut',
        },
        '-=0.4',
      );
    },
    { scope: containerRef },
  );

  return (
    <section id="hero" ref={containerRef} aria-label="Introduction">
      <div className="absolute inset-0 w-full h-full z-0" aria-hidden="true">
        <Beams
          beamWidth={3}
          beamHeight={30}
          beamNumber={isMobileDevice() ? 8 : 20}
          lightColor="#83a2d2"
          speed={1.5}
          noiseIntensity={1.25}
          scale={0.2}
          rotation={45}
        />
      </div>

      <div className="hero-content">
        <div className="name-badge">
          <div className="pulse" aria-hidden="true"></div>
          <span>Ebrar Hosgul — Frontend Dev.</span>
        </div>

        <h1 className="sr-only">Architecting Digital Perfection</h1>
        <h1 className="title" aria-hidden="true">
          Architecting <br />
          <span>Digital Perfection</span>
        </h1>

        <div className="subtitle-wrapper">
          <p className="sr-only">
            Engineering robust digital products with a focus on architectural
            scalability. Blending technical depth with fluid motion for the
            modern web.
          </p>

          <p className="subtitle" aria-hidden="true">
            Engineering robust digital products with a focus on architectural
            scalability. Blending technical depth with fluid motion for the
            modern web.
          </p>
        </div>

        <div className="cta-buttons">
          <a
            href="#projects"
            className="bg-white text-black font-bold hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.3)]"
            onClick={() =>
              trackEvent('button_click', {
                label: 'View Projects',
                location: 'hero',
              })
            }
          >
            View Projects
          </a>

          <a
            href="#contact"
            className="bg-white/5 backdrop-blur-md border border-white/10 text-white font-medium hover:bg-white/10 transition-colors"
            onClick={() =>
              trackEvent('button_click', {
                label: 'Contact Me',
                location: 'hero',
              })
            }
          >
            Contact Me
          </a>
        </div>

        <div className="hero-social-container">
          <a
            href="https://www.linkedin.com/in/ebrarhosgul/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit Ebrar's LinkedIn Profile"
            onClick={() =>
              trackEvent('social_click', {
                label: 'LinkedIn',
                location: 'hero',
              })
            }
          >
            <FaLinkedinIn aria-hidden="true" />
          </a>
          <a
            href="https://github.com/ebrarhosgul"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit Ebrar's GitHub Profile"
            onClick={() =>
              trackEvent('social_click', {
                label: 'GitHub',
                location: 'hero',
              })
            }
          >
            <FaGithub aria-hidden="true" />
          </a>
        </div>
      </div>

      <div className="scroll-wrapper" aria-hidden="true">
        <span className="scroll-text">Scroll to explore</span>
        <div className="scroll-line"></div>
      </div>
    </section>
  );
};

export default Hero;
