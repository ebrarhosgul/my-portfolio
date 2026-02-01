'use client';

import React, { useState, useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { FaCamera, FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa';
import LightRays from './LightRays';
import ShinyText from './ShinyText';
import TechStack from './TechStack';
import Image from 'next/image';
import { trackEvent } from '@/lib/analytics';
import profileCutout from '@/assets/images/profile-cutout.png';
import worldMap from '@/assets/images/world-map.png';
import photo from '@/assets/images/photo.jpeg';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

const Card = ({ children, className = '', ...props }: CardProps) => (
  <div
    className={`relative overflow-hidden rounded-3xl bg-neutral-900/50 border border-white/5 hover:border-white/10 transition-all duration-500 group ${className}`}
    {...props}
  >
    {children}
  </div>
);

const CurrentTime = () => {
  const [time, setTime] = useState('');
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }),
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="font-mono text-xs text-blue-200/90 mt-1"
      aria-label={`Current time in Istanbul: ${time}`}
    >
      {time} GMT+3
    </div>
  );
};

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const lightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (lightRef.current && sectionRef.current) {
      gsap.set(lightRef.current, { opacity: 0 });

      gsap.to(lightRef.current, {
        opacity: 1,
        duration: 0.7,
        ease: 'power1.inOut',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top center',
          end: 'bottom center',
          toggleActions: 'play reverse play reverse',
        },
      });
    }
  }, []);

  const handleContactClick = () => {
    const contactSection = document.getElementById('contact');

    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });

      setTimeout(() => {
        const nameInput = document.getElementById('name');

        if (nameInput) nameInput.focus();
      }, 1000);

      trackEvent('button_click', {
        label: 'Get in touch Card',
        location: 'about_section',
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="about"
      aria-label="About Me and Skills"
      className="min-h-screen w-full bg-black py-20 px-4 md:px-8 flex flex-col justify-center items-center relative overflow-hidden isolation-isolate z-10"
    >
      <div
        ref={lightRef}
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none z-0 opacity-0 bg-black mix-blend-screen"
        style={{
          willChange: 'opacity',
        }}
      >
        <LightRays
          raysOrigin="top-center"
          raysColor="#40E0D0"
          raysSpeed={0.2}
          lightSpread={3}
          rayLength={6}
          followMouse={false}
          mouseInfluence={0}
          noiseAmount={0.08}
          distortion={0.05}
        />
      </div>

      <div className="mb-12 text-center max-w-3xl relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
          Beyond the Code
        </h2>
        <p className="text-neutral-300 text-lg font-light">
          Engineered for impact.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-4 w-full max-w-5xl h-auto md:h-[650px] relative z-10">
        <Card className="order-2 md:order-0 md:col-span-2 md:row-span-1 p-8 flex flex-col justify-center relative overflow-hidden bg-linear-to-br from-neutral-900/80 to-black">
          <div
            className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[50px] rounded-full pointer-events-none"
            aria-hidden="true"
          ></div>

          <div className="flex items-start justify-between mb-4">
            <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center text-blue-400 border border-white/5 shadow-inner">
              <span className="text-lg" role="img" aria-label="High Voltage">
                ⚡️
              </span>
            </div>

            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-[10px] font-medium uppercase tracking-wider shadow-[0_0_10px_rgba(34,197,94,0.1)]">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Open to Work
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-white mb-2">Ebrar Hosgul</h3>
            <p className="text-neutral-400 text-sm leading-relaxed max-w-md">
              Bridging the gap between engineering and design. I build
              high-performance interfaces that feel instant and look cinematic.
            </p>
          </div>
        </Card>

        <Card className="hidden md:flex md:col-span-1 md:row-span-1 flex-col items-center justify-center relative bg-neutral-900">
          <Image
            src={worldMap}
            alt="World Map"
            fill
            placeholder="blur"
            className="absolute inset-0 object-cover object-center opacity-40 filter invert-[0.1]"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent"
            aria-hidden="true"
          ></div>

          <div className="relative z-10 text-center">
            <div className="w-12 h-12 mx-auto bg-white/5 backdrop-blur-md rounded-full flex items-center justify-center text-gray-200 mb-3 border border-white/10 shadow-lg">
              <FaMapMarkerAlt size={16} aria-hidden="true" />
            </div>
            <h3 className="text-white font-bold text-base tracking-wide">
              Istanbul
            </h3>
            <CurrentTime />
          </div>
        </Card>

        <Card className="hidden md:flex md:col-span-1 md:row-span-1 flex-col items-center justify-center bg-neutral-900 group">
          <div className="relative">
            <div
              className="text-5xl font-bold text-transparent bg-clip-text bg-linear-to-b from-white via-white to-white/10 group-hover:to-blue-400/50 transition-all duration-500"
              aria-label="Starting since 2022"
            >
              2022
            </div>
          </div>

          <p className="text-[10px] text-neutral-400 mt-2 uppercase tracking-[0.25em] font-medium border-t border-neutral-800 pt-2 w-2/3 text-center group-hover:text-blue-400 transition-colors">
            Building Since
          </p>
        </Card>

        <Card className="order-1 md:order-0 min-h-[400px] md:min-h-0 md:h-auto md:col-span-2 md:row-span-2 relative border-none bg-black overflow-hidden group">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-linear-to-tr from-blue-900/10 via-transparent to-purple-900/10 opacity-50 group-hover:opacity-100 transition-opacity duration-700"
            aria-hidden="true"
          ></div>

          <Image
            src={profileCutout}
            alt="Portrait of Ebrar Hosgul"
            placeholder="blur"
            className="absolute bottom-[-70px] left-1/2 -translate-x-1/2 w-[90%] md:w-[85%] h-auto object-cover object-bottom transition-transform duration-700 ease-out group-hover:scale-105 z-10"
          />

          <div
            className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent z-20"
            aria-hidden="true"
          ></div>
          <div className="absolute bottom-6 left-6 z-30">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 backdrop-blur-xl border border-white/10 text-xs text-white font-medium mb-1 shadow-lg">
              <span
                className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"
                aria-hidden="true"
              ></span>
              UI Architect
            </div>
          </div>
        </Card>

        <Card className="order-3 md:order-0 md:col-span-2 md:row-span-1 px-6 flex flex-col items-center justify-evenly bg-neutral-900/30 relative overflow-hidden group gap-2.5">
          <ShinyText
            text="Core Stack"
            disabled={false}
            speed={4}
            className="text-neutral-400 font-semibold uppercase tracking-widest text-xs mt-5"
          />

          <TechStack />

          <div
            className="absolute bottom-0 w-1/2 h-1 bg-linear-to-r from-transparent via-white/10 to-transparent blur-sm"
            aria-hidden="true"
          ></div>
        </Card>

        <Card
          role="button"
          tabIndex={0}
          aria-label="Photography Portfolio: Architecture and Visuals"
          className="hidden md:block md:col-span-1 md:row-span-1 relative group cursor-pointer bg-black overflow-hidden focus:ring-2 focus:ring-blue-400 focus:outline-hidden"
        >
          <Image
            src={photo}
            alt="Architecture Photography"
            fill
            placeholder="blur"
            className="absolute inset-0 object-cover opacity-50 group-hover:opacity-100 transition-all duration-700 filter grayscale group-hover:grayscale-0 scale-110 group-hover:scale-100"
            style={{ objectPosition: 'center 100%' }}
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 bg-linear-to-b from-transparent via-black/20 to-black z-10"
            aria-hidden="true"
          ></div>
          <div className="relative z-20 h-full flex flex-col justify-between p-5 transition-opacity duration-500 group-hover:opacity-0">
            <div className="self-end p-2 bg-white/10 backdrop-blur-md rounded-full border border-white/5 group-hover:bg-white group-hover:text-black transition-colors">
              <FaCamera size={14} aria-hidden="true" />
            </div>
            <div>
              <h4 className="text-white font-bold text-lg leading-none mb-1">
                Visuals
              </h4>
              <p className="text-[10px] text-neutral-400 uppercase tracking-wider">
                Architecture
              </p>
            </div>
          </div>
        </Card>

        <Card
          role="button"
          tabIndex={0}
          onClick={handleContactClick}
          onKeyDown={(e: React.KeyboardEvent) => {
            if (e.key === 'Enter' || e.key === ' ') handleContactClick();
          }}
          aria-label="Get in touch via email"
          className="order-4 md:order-0 md:col-span-1 md:row-span-1 flex flex-col items-center justify-center gap-4 bg-neutral-900/50 group cursor-pointer hover:bg-neutral-800 transition-colors py-8 md:py-0 focus:ring-2 focus:ring-blue-400 focus:outline-hidden"
        >
          <div className="w-12 h-12 rounded-full bg-linear-to-br from-white/10 to-white/5 flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300 border border-white/5 group-hover:border-white/20 shadow-lg">
            <FaEnvelope size={20} aria-hidden="true" />
          </div>
          <div className="text-center">
            <p className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors">
              Get in touch
            </p>
            <p className="text-[10px] text-neutral-400 mt-1">
              Let's build something
            </p>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default About;
