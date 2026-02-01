'use client';

import { useEffect, useRef, useState, memo } from 'react';
import Image from 'next/image';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import {
  SiNextdotjs,
  SiReact,
  SiGreensock,
  SiTailwindcss,
  SiLeaflet,
  SiVitest,
  SiReactrouter,
  SiN8N,
  SiPostgresql,
  SiDocker,
  SiOllama,
  SiThreedotjs,
  SiGithub,
  SiLinkedin,
} from 'react-icons/si';
import ProjectShowcase from './ProjectShowcase';
import { trackEvent } from '@/lib/analytics';

const MobileVideoCard = memo<{ src: string; title: string }>(
  ({ src, title }) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
      const video = videoRef.current;
      if (!video) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        },
        { threshold: 0.1 },
      );

      observer.observe(video);

      return () => observer.disconnect();
    }, []);

    return (
      <video
        ref={videoRef}
        muted
        playsInline
        loop
        preload="metadata"
        style={{ width: '100%', height: 'auto' }}
        aria-label={`Preview video for ${title}`}
      >
        <source src={src} type="video/mp4" />
      </video>
    );
  },
);
MobileVideoCard.displayName = 'MobileVideoCard';

const PROJECTS_DATA = [
  {
    id: '01',
    title: 'SkyTrack',
    category: 'Next.js / Recharts',
    desc: 'Real-time telemetry dashboard implementing "Dead Reckoning" algorithms to simulate live aircraft altitude, reducing API polling by 90% while rendering geodesic flight paths via Leaflet.',
    source: '/videos/skytrack.mp4',
    hasVideo: true,
    color: '#4f46e5',
    stack: [
      { icon: SiNextdotjs, name: 'Next.js' },
      { icon: SiLeaflet, name: 'Leaflet' },
      { icon: SiVitest, name: 'Vitest' },
    ],
    repoUrl: 'https://github.com/ebrarhosgul/flight-tracker',
    liveUrl: 'https://flight-tracker-ebrar.vercel.app/',
  },
  {
    id: '02',
    title: 'AI Resume Analyzer',
    category: 'React / React Router v7',
    desc: 'Serverless AI platform built on Puter.js ecosystem, featuring client-side PDF-to-Canvas rendering and LLM-based document analysis with persistent Key-Value storage.',
    source: '/videos/resume-analyzer.mp4',
    hasVideo: true,
    color: '#ea580c',
    stack: [
      { icon: SiReact, name: 'React' },
      { icon: SiTailwindcss, name: 'Tailwind CSS' },
      { icon: SiReactrouter, name: 'React Router' },
    ],
    repoUrl: 'https://github.com/ebrarhosgul/ai-resume-analyzer',
    liveUrl: 'https://ai-resume-analyzer-ebrar.vercel.app/',
  },
  {
    id: '03',
    title: 'Headless Financial Assistant',
    category: 'n8n/ Ollama',
    desc: 'Autonomous financial agent orchestrated via n8n & Docker, leveraging local LLMs (Ollama) to process sensitive market data without external API dependencies.',
    source: '/videos/n8n.mp4',
    hasVideo: true,
    color: '#10b981',
    stack: [
      { icon: SiN8N, name: 'n8n' },
      { icon: SiPostgresql, name: 'PostgreSQL' },
      { icon: SiDocker, name: 'Docker' },
      { icon: SiOllama, name: 'Ollama' },
    ],
    infoText:
      'This project runs locally, you can see the details in my LinkedIn post.',
    linkedinUrl:
      'https://www.linkedin.com/posts/ebrarhosgul_n8n-backendengineering-docker-activity-7417475670479560704-pfJy',
  },
  {
    id: '04',
    title: 'MacBook 3D Landing Page',
    category: 'Framer / Tailwind',
    desc: 'High-performance product showcase using React Three Fiber, featuring optimized shader materials and scroll-driven GSAP animations.',
    source: '/videos/macbook-landing.mp4',
    hasVideo: true,
    color: '#06b6d4',
    stack: [
      { icon: SiReact, name: 'React' },
      { icon: SiGreensock, name: 'GSAP' },
      { icon: SiThreedotjs, name: 'Three.js' },
      { icon: SiTailwindcss, name: 'Tailwind CSS' },
    ],
    repoUrl: 'https://github.com/ebrarhosgul/gsap-macbook-landing',
    liveUrl: 'https://macbook-landing-page-ebrar.vercel.app/',
  },
];

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const desktopWrapperRef = useRef<HTMLDivElement>(null);
  const rightColumnRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.matchMedia({
        '(min-width: 1024px)': function () {
          ScrollTrigger.create({
            trigger: desktopWrapperRef.current,
            start: 'top top',
            end: 'bottom bottom',
            pin: rightColumnRef.current,
            pinSpacing: false,
          });

          ScrollTrigger.create({
            trigger: desktopWrapperRef.current,
            start: 'top top',
            end: 'bottom bottom',
            pin: titleRef.current,
            pinSpacing: false,
          });

          const textSections = gsap.utils.toArray<HTMLElement>(
            '.project-text-section',
          );
          textSections.forEach((section, i) => {
            ScrollTrigger.create({
              trigger: section,
              start: 'top center',
              end: 'bottom center',
              onEnter: () => setActiveIndex(i),
              onEnterBack: () => setActiveIndex(i),
            });
          });
        },
        '(max-width: 1023px)': function () {
          const mobileCards = gsap.utils.toArray<HTMLElement>(
            '.mobile-project-card',
          );
          mobileCards.forEach((card) => {
            gsap.fromTo(
              card,
              { y: 30, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.6,
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: card,
                  start: 'top 85%',
                },
              },
            );
          });
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="projects"
      aria-label="Selected Projects"
      style={{
        backgroundImage: `
      radial-gradient(circle at 60% 50%, ${PROJECTS_DATA[activeIndex].color}80 0%, transparent 40%),
      radial-gradient(circle at 60% 50%, ${PROJECTS_DATA[activeIndex].color}33 40%, #000000 100%)
    `,
      }}
    >
      <div
        ref={desktopWrapperRef}
        className="hidden lg:flex w-full max-w-[1400px] mx-auto items-start relative"
      >
        <div
          className="projects-title-section absolute top-[8vh] [@media(max-height:800px)]:top-[6vh] left-6 md:left-12 z-10 pointer-events-none w-full flex-center-col"
          ref={titleRef}
          aria-hidden="true"
        >
          <h2 className="text-2xl font-bold uppercase tracking-[0.4em] text-white/40 mb-2">
            Selected Works
          </h2>
          <p className="text-2xl font-bold max-w-xl leading-tight text-white/80">
            Precision & Passion.
          </p>
        </div>

        <div className="w-1/2 pl-12 pr-4 lg:pr-8">
          {PROJECTS_DATA.map((project, index) => {
            const isActive = activeIndex === index;

            return (
              <article
                key={index}
                className="project-text-section h-screen flex flex-col justify-center"
                aria-label={`Project ${index + 1}: ${project.title}`}
              >
                <div
                  className={`transition-all duration-500 ${
                    isActive
                      ? 'opacity-100 translate-x-0'
                      : 'opacity-20 -translate-x-4 blur-[2px]'
                  }`}
                >
                  <div
                    className="flex items-center gap-4 mb-6"
                    aria-hidden="true"
                  >
                    <span className="text-sm font-mono text-white/30">
                      0{index + 1}
                    </span>
                    <div className="h-px w-12 bg-white/10"></div>
                    <span
                      className="text-xs font-bold uppercase tracking-widest"
                      style={{ color: project.color }}
                    >
                      {project.category}
                    </span>
                  </div>

                  <h3 className="text-5xl xl:text-6xl font-black mb-6 leading-tight">
                    {project.title}
                  </h3>

                  <p className="text-gray-400 text-lg leading-relaxed mb-8 max-w-md">
                    {project.desc}
                  </p>

                  <div
                    className="flex flex-wrap gap-3 mb-8"
                    role="list"
                    aria-label="Tech Stack"
                  >
                    {project.stack.map((tech, i) => (
                      <div
                        key={i}
                        role="listitem"
                        className="group relative p-2.5 rounded-lg bg-white/5 border border-white/5 text-gray-400 hover:bg-white/10 hover:text-white transition-colors cursor-help"
                      >
                        <tech.icon size={20} aria-hidden="true" />

                        {}
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-[10px] uppercase tracking-wider font-bold text-white opacity-0 group-hover:opacity-100 transform scale-90 group-hover:scale-100 transition-all duration-300 pointer-events-none whitespace-nowrap z-20 shadow-xl">
                          {tech.name}
                          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-white/20"></div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col gap-3">
                    {project.infoText && (
                      <p className="text-white/60 text-xs italic border-l-2 border-white/20 pl-3 py-1 mt-2">
                        {project.infoText}
                      </p>
                    )}
                    <div className="flex items-center gap-4">
                      {project.repoUrl && (
                        <a
                          href={project.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center gap-2 text-white/70 hover:text-white font-medium text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/50 rounded p-1 transition-colors"
                          aria-label={`View source code of ${project.title}`}
                          onClick={() =>
                            trackEvent('project_click', {
                              project: project.title,
                              link_type: 'repo',
                              location: 'projects_section',
                            })
                          }
                        >
                          <SiGithub size={18} />
                          <span className="border-b border-transparent group-hover:border-white/50 pb-0.5 transition-all">
                            Source Code
                          </span>
                        </a>
                      )}

                      {project.repoUrl && project.liveUrl && (
                        <div className="h-4 w-px bg-white/20"></div>
                      )}

                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center gap-3 text-white font-bold text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/50 rounded p-1"
                          aria-label={`View live demo of ${project.title}`}
                          onClick={() =>
                            trackEvent('project_click', {
                              project: project.title,
                              link_type: 'demo',
                              location: 'projects_section',
                            })
                          }
                        >
                          <span className="border-b border-white/20 pb-1 group-hover:border-white transition-colors">
                            Live Demo
                          </span>
                          <span
                            className="group-hover:translate-x-1 transition-transform"
                            aria-hidden="true"
                          >
                            →
                          </span>
                        </a>
                      )}
                      {project.linkedinUrl && (
                        <a
                          href={project.linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center gap-3 text-white font-bold text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/50 rounded p-1"
                          aria-label={`View LinkedIn post for ${project.title}`}
                          onClick={() =>
                            trackEvent('project_click', {
                              project: project.title,
                              link_type: 'post',
                              location: 'projects_section',
                            })
                          }
                        >
                          <span className="border-b border-white/20 pb-1 group-hover:border-white transition-colors">
                            View Post
                          </span>
                          <span
                            className="group-hover:translate-x-1 transition-transform"
                            aria-hidden="true"
                          >
                            →
                          </span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div
          ref={rightColumnRef}
          className="w-1/2 h-screen sticky top-0"
          aria-hidden="true"
        >
          <ProjectShowcase projects={PROJECTS_DATA} activeIndex={activeIndex} />
        </div>
      </div>

      <div className="lg:hidden px-6 mb-12 pt-24">
        <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-white/40 mb-4">
          Selected Works
        </h2>
        <p className="text-3xl font-black max-w-2xl leading-tight">
          Precision & Passion.
        </p>
      </div>

      <div className="lg:hidden flex flex-col gap-16 px-6 mt-4 pb-24">
        {PROJECTS_DATA.map((project, index) => {
          return (
            <article
              key={index}
              className="mobile-project-card flex flex-col gap-6 opacity-0 will-change-transform"
              aria-labelledby={`mobile-project-title-${index}`}
            >
              <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-white/10 bg-[#111] shadow-lg">
                {project.hasVideo ? (
                  <MobileVideoCard src={project.source} title={project.title} />
                ) : (
                  <Image
                    src={project.source}
                    alt={`Screenshot of ${project.title}`}
                    fill
                    className="object-cover"
                  />
                )}
                <div
                  className="absolute bottom-0 left-0 w-full h-1"
                  style={{ background: project.color }}
                ></div>
              </div>

              <div>
                <div
                  className="flex items-center gap-3 mb-3"
                  aria-hidden="true"
                >
                  <span className="text-xs font-mono text-white/40">
                    0{index + 1}
                  </span>
                  <span
                    className="text-xs font-bold uppercase tracking-widest"
                    style={{ color: project.color }}
                  >
                    {project.category}
                  </span>
                </div>

                <h3
                  id={`mobile-project-title-${index}`}
                  className="text-3xl font-black mb-4 leading-tight"
                >
                  {project.title}
                </h3>

                <p className="text-gray-400 text-base leading-relaxed mb-6">
                  {project.desc}
                </p>

                <div className="flex gap-3 mt-auto">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-3 text-center rounded-xl bg-white/5 border border-white/10 text-white text-sm font-bold hover:bg-white/10 transition-colors focus:ring-2 focus:ring-white/50 focus:outline-none"
                      aria-label={`View live demo of ${project.title}`}
                      onClick={() =>
                        trackEvent('project_click', {
                          project: project.title,
                          link_type: 'demo',
                          location: 'projects_section',
                        })
                      }
                    >
                      Live Demo
                    </a>
                  )}
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-bold hover:bg-white/10 transition-colors focus:ring-2 focus:ring-white/50 focus:outline-none ${!project.liveUrl ? 'flex-1' : 'px-4'}`}
                      aria-label={`View source code of ${project.title}`}
                      onClick={() =>
                        trackEvent('project_click', {
                          project: project.title,
                          link_type: 'repo',
                          location: 'projects_section',
                        })
                      }
                    >
                      <SiGithub size={18} />
                      <span className={project.liveUrl ? 'sr-only' : ''}>
                        Code
                      </span>
                    </a>
                  )}
                  {project.linkedinUrl && (
                    <a
                      href={project.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-bold hover:bg-[#0077b5]/20 hover:text-[#0077b5] transition-colors focus:ring-2 focus:ring-white/50 focus:outline-none ${!project.liveUrl && !project.repoUrl ? 'flex-1' : 'px-4'}`}
                      aria-label={`View LinkedIn post for ${project.title}`}
                      onClick={() =>
                        trackEvent('project_click', {
                          project: project.title,
                          link_type: 'post',
                          location: 'projects_section',
                        })
                      }
                    >
                      <SiLinkedin size={18} />
                      <span
                        className={
                          project.liveUrl || project.repoUrl ? 'sr-only' : ''
                        }
                      >
                        Post
                      </span>
                    </a>
                  )}
                </div>
                {project.infoText && (
                  <p className="text-white/60 text-xs italic border-l-2 border-white/20 pl-3 py-1 mt-4">
                    {project.infoText}
                  </p>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
