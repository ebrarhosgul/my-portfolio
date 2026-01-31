import { memo } from 'react';
import { SKILLS } from './constants';

import { SkillTextProps } from '@/types/skills';

export const SkillText = memo<SkillTextProps>(({ skill, index, isRight }) => {
  return (
    <div
      className={`skill-text-group absolute top-1/2 -translate-y-1/2 flex flex-col justify-center ${
        isRight
          ? 'right-4 md:right-24 items-end text-right'
          : 'left-4 md:left-24 items-start text-left'
      } opacity-0 will-change-transform`}
    >
      <h3
        className="text-6xl md:text-8xl font-bold tracking-tighter drop-shadow-xl"
        style={{ color: skill.color }}
      >
        {skill.text}
      </h3>
      <p className="text-xl md:text-2xl text-white/70 mt-4 max-w-md font-light leading-relaxed">
        {skill.desc}
      </p>
    </div>
  );
});

SkillText.displayName = 'SkillText';

export const CubeFaces = memo(() => {
  return (
    <>
      <div className="cube-face front"></div>
      <div className="cube-face back"></div>
      <div className="cube-face right"></div>
      <div className="cube-face left"></div>
      <div className="cube-face top"></div>
      <div className="cube-face bottom"></div>
    </>
  );
});

CubeFaces.displayName = 'CubeFaces';

export const BackgroundElements = memo(() => {
  return (
    <div
      className="absolute inset-0 pointer-events-none z-0"
      aria-hidden="true"
    >
      <div className="ambient-light absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full md:w-[120vw] md:h-[120vw] rounded-full blur-[120px] opacity-0"></div>
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_90%)]"></div>
    </div>
  );
});

BackgroundElements.displayName = 'BackgroundElements';

export const IntroHeadline = memo(() => {
  return (
    <div className="intro-headline absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center z-40 pointer-events-none px-4 will-change-transform">
      <h2 className="text-white font-black text-6xl md:text-8xl tracking-tighter leading-[0.9] drop-shadow-2xl mix-blend-overlay">
        THE
        <br />
        BLUEPRINT
      </h2>
    </div>
  );
});

IntroHeadline.displayName = 'IntroHeadline';

export const FinalContent = memo(() => {
  return (
    <div className="final-content absolute z-40 flex flex-col items-center justify-center text-center w-full opacity-0 will-change-transform">
      <div className="final-spotlight absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-white/10 via-indigo-500/10 to-transparent blur-[120px] rounded-full opacity-50 pointer-events-none"></div>
      <h2 className="text-white font-black text-6xl md:text-[10rem] tracking-tighter leading-[0.9] drop-shadow-[0_0_50px_rgba(255,255,255,0.2)]">
        BUILT TO
        <br />
        SCALE.
      </h2>
    </div>
  );
});

FinalContent.displayName = 'FinalContent';
