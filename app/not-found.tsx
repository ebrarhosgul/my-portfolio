import Link from 'next/link';
import { SiLinkedin } from 'react-icons/si';

export default function NotFound() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-[#050505] text-white overflow-hidden font-sans">
      <div className="absolute inset-0 z-0 bg-digital-grid pointer-events-none" />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none opacity-50 mix-blend-screen" />

      <div className="relative z-10 flex flex-col items-center text-center px-6 animate-in fade-in zoom-in duration-700">
        <h1 className="animate-float neon-text-glow text-[10rem] md:text-[14rem] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-blue-100 to-white/10 select-none font-[family-name:var(--font-fugaz-one)]">
          404
        </h1>
        <h2 className="text-2xl md:text-4xl font-bold mt-8 tracking-tight">
          Lost deep diving into my profile details?
        </h2>

        <p className="text-gray-400 text-base md:text-lg mt-4 max-w-xl font-light leading-relaxed">
          No worries. You can either return to base, or connect directly on
          LinkedIn to learn more about me.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 mt-10 w-full sm:w-auto">
          <Link
            href="/"
            className="group relative w-full sm:w-auto px-8 py-3.5 bg-white text-black rounded-lg font-bold text-sm overflow-hidden transition-all hover:scale-105 active:scale-95"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative z-10 flex items-center justify-center gap-2">
              Return to Base
            </span>
          </Link>

          <a
            href="https://www.linkedin.com/in/ebrarhosgul/"
            target="_blank"
            rel="noopener noreferrer"
            className="group w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 bg-white/5 border border-white/10 text-white rounded-lg font-medium text-sm hover:bg-[#0077b5] hover:border-[#0077b5] hover:scale-105 transition-all duration-300 active:scale-95"
          >
            <SiLinkedin className="text-lg group-hover:text-white text-[#0077b5] transition-colors" />
            Send Message on LinkedIn
          </a>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#050505] to-transparent z-20 pointer-events-none" />
    </div>
  );
}
