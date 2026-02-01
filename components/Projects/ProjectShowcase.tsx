'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { IconType } from 'react-icons';

import { Project, ProjectShowcaseProps } from '@/types/projects';

export default function ProjectShowcase({
  projects,
  activeIndex,
}: ProjectShowcaseProps) {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;

      if (index === activeIndex) {
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            video.pause();
            video.currentTime = 0;
          });
        }
      } else {
        video.pause();
        video.currentTime = 0;
      }
    });
  }, [activeIndex]);

  return (
    <div className="w-full h-screen flex items-center justify-center p-4 lg:p-8">
      <div
        className="w-full xl:max-w-6xl aspect-video flex flex-col rounded-2xl overflow-hidden bg-[#121212] border border-white/10 shadow-[0_0_50px_-15px_rgba(0,0,0,0.7)]"
        role="figure"
        aria-label="Project Preview Window"
      >
        <div
          className="h-6 w-full flex items-center px-4 select-none shrink-0"
          aria-hidden="true"
        >
          <div className="flex space-x-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors"></div>
          </div>
        </div>

        <div className="flex-1 w-full px-2 pb-2 relative">
          <div className="relative w-full h-full rounded-xl overflow-hidden bg-[#050505] border border-white/5">
            <div
              className="absolute inset-0 transition-colors duration-1000 opacity-20 z-0"
              style={{
                background: `radial-gradient(circle at 50% 50%, ${projects[activeIndex].color}, transparent 80%)`,
              }}
              aria-hidden="true"
            ></div>

            {projects.map((project, index) => {
              if (Math.abs(activeIndex - index) > 1) return null;

              const isActive = activeIndex === index;

              return (
                <div
                  key={project.id}
                  aria-hidden={!isActive}
                  className={`absolute inset-0 w-full h-full transition-all duration-700 ease-in-out ${
                    isActive
                      ? 'opacity-100 scale-100 z-10'
                      : 'opacity-0 scale-105 z-0'
                  }`}
                >
                  {project.hasVideo ? (
                    <video
                      ref={(el) => {
                        videoRefs.current[index] = el;
                      }}
                      muted
                      playsInline
                      loop
                      preload="metadata"
                      className="w-full h-full object-cover"
                      aria-label={`Preview video for ${project.title}`}
                      tabIndex={isActive ? 0 : -1}
                    >
                      <source
                        src={project.source.replace('.mp4', '.webm')}
                        type="video/webm"
                      />
                      <source src={project.source} type="video/mp4" />
                    </video>
                  ) : (
                    <Image
                      src={project.source}
                      alt={`Preview image for ${project.title}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1200px) 100vw, 80vw"
                      priority={index === 0}
                    />
                  )}
                  <div
                    className="absolute inset-0 bg-black/10 pointer-events-none"
                    aria-hidden="true"
                  ></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
