import { useRef, useEffect, memo } from 'react';
import { gsap } from '@/lib/gsap';
import { SKILLS } from './constants';
import { SkillCardProps } from '@/types/skills';

const SkillCard = memo<SkillCardProps>(({ skill, index }) => {
  const isFromRight = index % 2 === 0;

  return (
    <div
      className={`skill-card opacity-0 will-change-transform`}
      data-index={index}
      data-direction={isFromRight ? 'right' : 'left'}
    >
      <div
        className="relative py-8 px-6 rounded-lg border transition-all duration-300"
        style={{
          borderColor: `${skill.color}40`,
          backgroundColor: 'rgba(255, 255, 255, 0.02)',
        }}
      >
        <h3
          className="text-3xl font-bold tracking-tighter mb-2"
          style={{ color: skill.color }}
        >
          {skill.text}
        </h3>
        <p className="text-base text-white/60 font-light leading-relaxed">
          {skill.desc}
        </p>
      </div>
    </div>
  );
});

SkillCard.displayName = 'SkillCard';

export default function SkillsManifestoMobile() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.skill-card') as HTMLElement[];

      cards.forEach((card) => {
        const direction = card.getAttribute('data-direction');
        const fromX = direction === 'right' ? 100 : -100;

        gsap.fromTo(
          card,
          {
            opacity: 0,
            x: fromX,
          },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
              end: 'top 50%',
              scrub: 1,
              invalidateOnRefresh: true,
            },
          },
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="skills-manifesto"
      className="relative w-full h-max bg-[#050505] py-20 px-6 pb-24 overflow-hidden z-10"
    >
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_90%)]"></div>
      </div>

      <div className="relative z-10 mb-12 text-center">
        <h2 className="text-white font-black text-5xl tracking-tighter leading-[0.9]">
          THE
          <br />
          BLUEPRINT
        </h2>
      </div>

      <div className="relative z-10 space-y-6 w-full max-w-sm mx-auto px-2">
        {SKILLS.map((skill, index) => (
          <SkillCard key={index} skill={skill} index={index} />
        ))}
      </div>
    </section>
  );
}
