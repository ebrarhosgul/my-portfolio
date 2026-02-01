import { useRef, useMemo } from 'react';
import { gsap } from '@/lib/gsap';
import { useGSAP } from '@gsap/react';
import { isMobileDevice } from '@/lib/device';
import { SKILLS, STEP_DURATION, SCROLL_MULTIPLIER } from './constants';
import {
  CubeFaces,
  BackgroundElements,
  IntroHeadline,
  FinalContent,
  SkillText,
} from './shared';

export default function SkillsManifestoDesktop() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cubeRef = useRef<HTMLDivElement>(null);

  const animationConfig = useMemo(() => {
    const totalDuration = SKILLS.length * STEP_DURATION + 4;
    const totalScrollPixels = totalDuration * SCROLL_MULTIPLIER;

    return {
      totalDuration,
      totalScrollPixels,
    };
  }, []);

  const skillPositions = useMemo(() => {
    return SKILLS.map((_, index) => ({
      index,
      isRight: index % 2 === 0,
    }));
  }, []);

  useGSAP(
    () => {
      const isMobile = isMobileDevice();

      if (typeof window !== 'undefined' && window.innerWidth < 768) {
        return;
      }

      const items = gsap.utils.toArray('.skill-text-group') as HTMLElement[];
      const faces = gsap.utils.toArray('.cube-face') as HTMLElement[];

      gsap.set(cubeRef.current, {
        rotateX: -20,
        rotateY: -30,
        rotateZ: 5,
        opacity: 1,
        scale: 1,
      });

      gsap.set('.cube-face', {
        borderColor: SKILLS[0].color,
        backgroundColor: `${SKILLS[0].color}15`,
        boxShadow: 'none',
      });

      if (!isMobile) {
        gsap.to('.cube-face', {
          boxShadow: `0 0 50px 30px ${SKILLS[0].glow} inset, 0 0 20px ${SKILLS[0].color}`,
          duration: 1.5,
          ease: 'power2.out',
        });
      }

      gsap.set('.intro-headline', { y: 0, scale: 1, opacity: 1 });
      if (!isMobile) {
        gsap.set('.ambient-light', {
          opacity: 0,
          backgroundColor: SKILLS[0].color,
        });
      }

      const tlIntro = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          end: 'top top',
          scrub: isMobile ? 2 : 1,
        },
      });

      tlIntro.to(
        '.intro-headline',
        {
          y: '-42vh',
          scale: 0.5,
          opacity: 0.8,
          ease: 'power1.inOut',
        },
        0,
      );

      tlIntro.from(
        faces,
        {
          x: (i) => {
            const w = typeof window !== 'undefined' ? window.innerWidth : 1000;
            const multiplier = isMobile ? 0.4 : 0.8;
            if (i === 0 || i === 3) return -w * multiplier;
            if (i === 1 || i === 2) return w * multiplier;
            return 0;
          },
          y: (i) => {
            const h = typeof window !== 'undefined' ? window.innerHeight : 800;
            const multiplier = isMobile ? 0.4 : 0.8;
            if (i === 0 || i === 2) return -h * multiplier;
            if (i === 1 || i === 3) return h * multiplier;
            if (i === 4) return -h * (isMobile ? 0.6 : 1.2);
            return h * (isMobile ? 0.6 : 1.2);
          },
          z: (i) =>
            i % 2 === 0 ? (isMobile ? 300 : 1000) : isMobile ? -300 : -1000,
          rotation: (i) =>
            i % 2 === 0 ? (isMobile ? 180 : 720) : isMobile ? -180 : -720,
          opacity: 0,
          scale: isMobile ? 2 : 5,
          ease: 'power1.inOut',
        },
        0,
      );

      if (!isMobile) {
        tlIntro.to('.ambient-light', { opacity: 0.2 }, 0);
      }

      const tlMain = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: `+=${animationConfig.totalScrollPixels}`,
          pin: true,
          scrub: isMobile ? 2 : 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onRefresh: () => {
            const progress = tlMain.progress();
            tlMain.invalidate();
            tlMain.progress(progress);
          },
        },
      });

      let currentRotationY = -30;

      items.forEach((skill, i) => {
        const isRightAligned = i % 2 === 0;
        const startTime = i * STEP_DURATION;
        const targetX = isRightAligned ? '-25vw' : '25vw';
        const targetY = isMobile ? (isRightAligned ? '-15vh' : '15vh') : 0;

        let motionProps = {};
        let rotY = 0;
        switch (i) {
          case 0:
            rotY = 45;
            motionProps = {
              rotateX: 20,
              rotateZ: 5,
              scale: 1,
              ease: 'sine.inOut',
            };
            break;
          case 1:
            rotY = 90;
            motionProps = {
              rotateX: -25,
              rotateZ: 0,
              scale: 1,
              ease: 'expo.inOut',
            };
            break;
          case 2:
            rotY = 180;
            motionProps = {
              rotateX: 15,
              rotateZ: -15,
              scaleX: 1.2,
              scaleY: 0.9,
              ease: 'back.inOut(1.5)',
            };
            break;
          case 3:
            rotY = 60;
            motionProps = {
              rotateX: 30,
              rotateZ: 10,
              scaleX: 0.8,
              scaleY: 0.8,
              ease: 'power3.inOut',
            };
            break;
          case 4:
            rotY = 360;
            motionProps = {
              rotateX: 380,
              rotateZ: -20,
              scale: 1,
              ease: 'circ.inOut',
            };
            break;
        }
        currentRotationY += rotY;

        tlMain.to(
          cubeRef.current,
          {
            x: targetX,
            y: targetY,
            rotateY: currentRotationY,
            duration: 2,
            ...motionProps,
          },
          startTime,
        );

        tlMain.to(
          '.cube-face',
          {
            borderColor: SKILLS[i].color,
            backgroundColor: `${SKILLS[i].color}15`,
            ...(isMobile
              ? {}
              : {
                  boxShadow: `0 0 60px 30px ${SKILLS[i].glow} inset, 0 0 30px ${SKILLS[i].color}`,
                }),
            duration: 1.5,
            immediateRender: false,
          },
          startTime,
        );

        if (!isMobile) {
          tlMain.to(
            '.ambient-light',
            {
              backgroundColor: SKILLS[i].color,
              duration: 1.5,
              immediateRender: false,
            },
            startTime,
          );
        }

        tlMain.fromTo(
          items[i],
          { opacity: 0, x: isRightAligned ? 30 : -30, scale: 0.95 },
          { opacity: 1, x: 0, scale: 1, duration: 1, ease: 'power2.out' },
          startTime + 1,
        );

        tlMain.to(
          items[i],
          { opacity: 0, scale: 0.95, duration: 0.5 },
          startTime + 2.8,
        );
      });

      const finaleStart = items.length * STEP_DURATION;
      const centeringDuration = 1.5;
      const ascentTime = finaleStart + centeringDuration;

      if (!isMobile) {
        tlMain.to(
          '.ambient-light',
          {
            backgroundColor: '#ffffff',
            opacity: 0.1,
            duration: 1.5,
            immediateRender: false,
          },
          finaleStart,
        );
      }

      tlMain.to(
        '.cube-face',
        {
          borderColor: '#ffffff',
          backgroundColor: 'rgba(255,255,255,0.4)',
          ...(isMobile
            ? {}
            : {
                boxShadow:
                  '0 0 100px 50px rgba(255,255,255,0.8) inset, 0 0 40px #ffffff',
              }),
          duration: centeringDuration,
          immediateRender: false,
        },
        finaleStart,
      );

      tlMain.to(
        cubeRef.current,
        {
          x: '0vw',
          y: 0,
          rotateX: 20,
          rotateZ: 0,
          scale: isMobile ? 1.2 : 1.5,
          rotateY: currentRotationY + 180,
          duration: centeringDuration,
          ease: 'power2.inOut',
          overwrite: 'auto',
        },
        finaleStart,
      );

      tlMain.to(
        cubeRef.current,
        {
          y: '-150vh',
          rotateY: currentRotationY + 180 + 720,
          rotateX: 385,
          scale: 0.2,
          duration: 2.5,
          ease: 'power3.in',
        },
        ascentTime,
      );
      tlMain.to(
        '.intro-headline',
        {
          y: '-150vh',
          opacity: 0,
          duration: 2.5,
          ease: 'power3.in',
        },
        ascentTime,
      );

      tlMain.fromTo(
        '.final-content',
        {
          opacity: 0,
          scale: 0.9,
          ...(isMobile ? {} : { filter: 'blur(10px)' }),
        },
        {
          opacity: 1,
          scale: 1,
          ...(isMobile ? {} : { filter: 'blur(0px)' }),
          duration: isMobile ? 0.8 : 1.5,
          ease: 'power2.out',
        },
        isMobile ? ascentTime + 0.3 : ascentTime + 0.5,
      );
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      id="skills-manifesto"
      className="relative w-full h-screen bg-[#050505] overflow-hidden flex flex-col items-center justify-center perspective-1000 z-10"
    >
      <BackgroundElements />
      <IntroHeadline />

      <div
        ref={cubeRef}
        className="absolute z-20 w-32 h-32 md:w-48 md:h-48 preserve-3d will-change-transform"
        style={{
          transformStyle: 'preserve-3d',
          WebkitTransformStyle: 'preserve-3d',
        }}
      >
        <CubeFaces />
      </div>

      <div className="relative z-30 w-full max-w-6xl h-full pointer-events-none">
        {skillPositions.map(({ index, isRight }) => (
          <SkillText
            key={index}
            skill={SKILLS[index]}
            index={index}
            isRight={isRight}
          />
        ))}
      </div>

      <FinalContent />
    </section>
  );
}
