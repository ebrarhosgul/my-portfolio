'use client';

import React, { useState } from 'react';
import { FaReact } from 'react-icons/fa';
import {
  SiNextdotjs,
  SiTailwindcss,
  SiTypescript,
  SiGreensock,
} from 'react-icons/si';

const STACK = [
  {
    name: 'TypeScript',
    icon: SiTypescript,
    color: 'group-hover/icon:text-[#3178C6]',
  },
  {
    name: 'Tailwind',
    icon: SiTailwindcss,
    color: 'group-hover/icon:text-[#38BDF8]',
  },
  {
    name: 'Next.js',
    icon: SiNextdotjs,
    color: 'group-hover/icon:text-white',
    isHero: true,
  },
  { name: 'React', icon: FaReact, color: 'group-hover/icon:text-[#61DAFB]' },
  { name: 'GSAP', icon: SiGreensock, color: 'group-hover/icon:text-[#88CE02]' },
];

const TechStack = () => {
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  return (
    <div
      className="flex items-center justify-center gap-4 h-20 w-full mt-2"
      role="list"
      aria-label="Technology Stack"
    >
      {STACK.map((tech) => {
        const isHovered = hoveredTech === tech.name;
        const isDefaultHero = !hoveredTech && tech.isHero;
        const isActive = isHovered || isDefaultHero;

        return (
          <div
            key={tech.name}
            role="listitem"
            tabIndex={0}
            aria-label={tech.name}
            className="relative min-w-12 h-full group/icon flex flex-col-reverse items-center justify-center cursor-pointer transition-all duration-300 ease-out focus:outline-hidden"
            onMouseEnter={() => setHoveredTech(tech.name)}
            onMouseLeave={() => setHoveredTech(null)}
            onFocus={() => setHoveredTech(tech.name)}
            onBlur={() => setHoveredTech(null)}
          >
            <div
              className={`text-center p-1 bg-neutral-800 border border-white/10 rounded text-[10px] text-white whitespace-nowrap transition-all duration-300 
              ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}`}
              aria-hidden="true"
            >
              {tech.name}
            </div>

            <tech.icon
              aria-hidden="true"
              className={`transition-all duration-300 ${tech.color}
                ${
                  isActive
                    ? 'text-5xl md:text-6xl text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] -translate-y-4'
                    : 'text-3xl text-neutral-400 hover:text-neutral-300'
                }
              `}
            />
          </div>
        );
      })}
    </div>
  );
};

export default TechStack;
