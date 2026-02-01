'use client';
import { useRef, useLayoutEffect } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { FaFolderOpen, FaUser, FaEnvelope } from 'react-icons/fa';
import { trackEvent } from '@/lib/analytics';

export default function Navbar() {
  const navRef = useRef(null);
  const containerRef = useRef(null);

  const menuItems = [
    { name: 'About', icon: <FaUser aria-hidden="true" />, href: '#about' },
    {
      name: 'Projects',
      icon: <FaFolderOpen aria-hidden="true" />,
      href: '#projects',
    },
    {
      name: 'Contact',
      icon: <FaEnvelope aria-hidden="true" />,
      href: '#contact',
    },
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onReverseComplete: () => {
          gsap.set(navRef.current, { clearProps: 'all' });
        },
        scrollTrigger: {
          trigger: document.body,
          start: 'top top-=20%',
          end: 'top top-=200',
          toggleActions: 'play none none reverse',
        },
      });

      tl.to(
        navRef.current,
        {
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          padding: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(10px)',
          duration: 0.5,
          ease: 'power2.inOut',
        },
        'shrink',
      )
        .to(
          '.nav-text, .nav-logo',
          {
            opacity: 0,
            display: 'none',
            duration: 0.2,
          },
          'shrink',
        )
        .to(
          navRef.current,
          {
            bottom: '30px',
            y: '85dvh',
            duration: 0.3,
            ease: 'sine.inOut',
          },
          'drop',
        )
        .to(
          navRef.current,
          {
            width: '200px',
            height: '60px',
            borderRadius: '16px',
            justifyContent: 'center',
            duration: 0.4,
            ease: 'back.out(1.7)',
          },
          'expand',
        )
        .to(
          '.nav-icon',
          {
            display: 'block',
            opacity: 1,
            scale: 1,
            duration: 0.3,
            stagger: 0.1,
          },
          'expand+=0.1',
        );
    }, navRef);

    return () => ctx.revert();
  }, []);

  return (
    <header>
      <nav
        ref={navRef}
        aria-label="Main Navigation"
        className="will-change-transform"
      >
        <a
          href="#hero"
          aria-label="Homepage - Ebrar Hosgul"
          onClick={() =>
            trackEvent('nav_click', { label: 'Logo', location: 'navbar' })
          }
        >
          <div className="nav-logo">EH</div>
        </a>

        <ul ref={containerRef}>
          {menuItems.map((item, index) => (
            <li key={index}>
              <a
                href={item.href}
                aria-label={item.name}
                onClick={() =>
                  trackEvent('nav_click', {
                    label: item.name,
                    location: 'navbar',
                  })
                }
              >
                <span className="nav-text">{item.name}</span>

                <span
                  className="nav-icon will-change-transform"
                  aria-hidden="true"
                >
                  {item.icon}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
