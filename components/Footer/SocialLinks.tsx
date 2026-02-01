'use client';

import { trackEvent } from '@/lib/analytics';

export default function SocialLinks() {
  return (
    <nav className="flex items-center gap-6">
      <a
        href="https://github.com/ebrarhosgul"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-[#83a2d2] transition-colors duration-300"
        aria-label="GitHub Profile"
        onClick={() =>
          trackEvent('social_click', {
            label: 'GitHub',
            location: 'footer',
          })
        }
      >
        Github
      </a>
      <a
        href="https://linkedin.com/in/ebrarhosgul"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-[#3B82F6] transition-colors duration-300"
        aria-label="LinkedIn Profile"
        onClick={() =>
          trackEvent('social_click', {
            label: 'LinkedIn',
            location: 'footer',
          })
        }
      >
        Linkedin
      </a>
    </nav>
  );
}
