'use client';

import { useRef, useActionState, useEffect, useState } from 'react';
import Image from 'next/image';
import { gsap } from '@/lib/gsap';
import { useGSAP } from '@gsap/react';
import { sendEmail } from '@/actions/contact';
import { trackEvent } from '@/lib/analytics';
import mailSending from '@/assets/images/mail-sending.webp';

function SubmitButton({
  isPending,
  isSuccess,
}: {
  isPending: boolean;
  isSuccess: boolean;
}) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const checkmarkRef = useRef<SVGSVGElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = buttonRef.current;

    if (!btn || isPending || isSuccess) return;

    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(btn, {
      x: x * 0.2,
      y: y * 0.2,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    if (isPending || isSuccess) return;

    gsap.to(buttonRef.current, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.3)',
    });
  };

  useEffect(() => {
    if (isSuccess && checkmarkRef.current) {
      const path = checkmarkRef.current.querySelector('path');

      if (path) {
        const length = path.getTotalLength();

        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });
        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 0.5,
          delay: 0.2,
          ease: 'power2.out',
        });
      }
    }

    if (!isSuccess && buttonRef.current) {
      gsap.to(buttonRef.current, {
        x: 0,
        y: 0,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  }, [isSuccess]);

  const isDisabled = isPending || isSuccess;

  return (
    <button
      ref={buttonRef}
      type="submit"
      disabled={isDisabled}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full h-[68px] md:w-auto md:min-w-[200px] px-10 py-5 font-bold text-lg rounded-full overflow-hidden disabled:cursor-not-allowed group cursor-pointer transition-[background-color,color,scale] duration-500 ${
        isSuccess
          ? 'bg-emerald-500 text-white scale-[1.02]'
          : 'bg-white text-black'
      }`}
    >
      <span
        className={`relative z-10 flex items-center justify-center gap-3 h-full transition-opacity duration-200 ${
          isPending || isSuccess ? 'opacity-0' : 'opacity-100'
        }`}
      >
        Send Message
        <svg
          className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          />
        </svg>
      </span>

      {isPending && (
        <span className="absolute inset-0 flex items-center justify-center z-20">
          <Image
            src={mailSending}
            alt="Sending..."
            className="h-12 w-auto object-contain"
          />
        </span>
      )}

      {isSuccess && (
        <span className="absolute inset-0 flex items-center justify-center gap-2 z-20 animate-fadeIn">
          <svg
            ref={checkmarkRef}
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
          <span className="font-semibold">Submitted</span>
        </span>
      )}
    </button>
  );
}

export default function Contact() {
  const containerRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const [state, formAction, isPending] = useActionState(sendEmail, {
    success: false,
    message: '',
  });

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          end: 'bottom bottom',
          toggleActions: 'play none none reverse',
        },
      });

      tl.from('.contact-title span', {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power4.out',
      }).from(
        '.contact-form-item',
        {
          y: 30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out',
        },
        '-=0.5',
      );
    },
    { scope: containerRef },
  );

  const handleFocus = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const line = e.target.parentElement?.querySelector('.input-line');
    if (line) {
      gsap.to(line, {
        scaleX: 1,
        duration: 0.4,
        ease: 'power2.out',
      });
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (e.target.value === '') {
      const line = e.target.parentElement?.querySelector('.input-line');
      if (line) {
        gsap.to(line, {
          scaleX: 0,
          duration: 0.3,
          ease: 'power2.out',
        });
      }
    }
  };

  useEffect(() => {
    if (state.success && formRef.current) {
      formRef.current.reset();
      trackEvent('contact_message_sent', { success: true });

      setShowSuccess(true);

      const timer = setTimeout(() => {
        setShowSuccess(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [state.success]);

  return (
    <section
      ref={containerRef}
      id="contact"
      className="relative w-full min-h-screen flex items-center justify-center py-24 px-6 bg-[#050505] overflow-hidden"
    >
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#83a2d2]/10 rounded-full blur-[120px] animate-float-slow pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[150px] animate-float-delayed pointer-events-none"></div>

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        <div className="space-y-8">
          <h2 className="contact-title text-5xl md:text-8xl font-bold md:leading-32 leading-normal">
            <span className="block bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
              Let's start
            </span>
            <span className="block text-white">a project</span>
            <span className="block bg-gradient-to-r from-white/60 to-white bg-clip-text text-transparent">
              together
            </span>
          </h2>
          <div className="contact-form-item text-white/60 text-xl max-w-md">
            <p>
              Have an idea? I'd love to help you bring it to life. Send me a
              message and let's discuss.
            </p>
          </div>
        </div>

        <div className="relative">
          <form ref={formRef} action={formAction} className="space-y-8">
            <div className="contact-form-item group relative">
              <label
                htmlFor="name"
                className="block text-sm text-white/50 mb-2 font-mono uppercase tracking-wider"
              >
                What's your name?
              </label>
              <input
                type="text"
                name="name"
                id="name"
                required
                placeholder="The Visionary"
                className="w-full bg-transparent border-b border-white/10 py-4 text-xl text-white outline-none placeholder:text-white/10 transition-colors focus:border-white/0"
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
              <div className="input-line absolute bottom-0 left-0 w-full h-[2px] bg-[#83a2d2] scale-x-0 origin-left"></div>
              {state.errors?.name && (
                <p className="text-red-400 text-sm mt-1">{state.errors.name}</p>
              )}
            </div>

            <div className="contact-form-item group relative">
              <label
                htmlFor="email"
                className="block text-sm text-white/50 mb-2 font-mono uppercase tracking-wider"
              >
                Your email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                placeholder="contact@future.com"
                className="w-full bg-transparent border-b border-white/10 py-4 text-xl text-white outline-none placeholder:text-white/10 transition-colors focus:border-white/0"
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
              <div className="input-line absolute bottom-0 left-0 w-full h-[2px] bg-[#83a2d2] scale-x-0 origin-left"></div>
              {state.errors?.email && (
                <p className="text-red-400 text-sm mt-1">
                  {state.errors.email}
                </p>
              )}
            </div>

            <div className="contact-form-item group relative">
              <label
                htmlFor="message"
                className="block text-sm text-white/50 mb-2 font-mono uppercase tracking-wider"
              >
                Tell me about your project
              </label>
              <textarea
                name="message"
                id="message"
                required
                rows={4}
                placeholder="Hello Ebrar, I have..."
                className="w-full bg-transparent border-b border-white/10 py-4 text-xl text-white outline-none placeholder:text-white/10 resize-none transition-colors focus:border-white/0"
                onFocus={handleFocus}
                onBlur={handleBlur}
              ></textarea>
              <div className="input-line absolute bottom-0 left-0 w-full h-[2px] bg-[#83a2d2] scale-x-0 origin-left"></div>
              {state.errors?.message && (
                <p className="text-red-400 text-sm mt-1">
                  {state.errors.message}
                </p>
              )}
            </div>

            <div className="hidden" aria-hidden="true">
              <input type="text" name="trap" tabIndex={-1} autoComplete="off" />
            </div>
            <div className="contact-form-item pt-4">
              <SubmitButton isPending={isPending} isSuccess={showSuccess} />

              {state.message && !state.success && (
                <p className="mt-4 text-sm text-red-400">{state.message}</p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
