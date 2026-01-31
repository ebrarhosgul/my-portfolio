import SocialLinks from './SocialLinks';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full h-[15dvh] max-h-12 bg-[#050505] border-t border-white/10 flex items-center justify-center relative z-10">
      <div className="w-full max-w-7xl mx-auto px-6 flex items-center justify-between text-[12px] font-mono uppercase tracking-widest text-neutral-400">
        <div className="flex items-center gap-1 select-none">
          <span>© {currentYear}</span>
          <span className="text-neutral-300">Ebrar Hosgul</span>
        </div>
        <SocialLinks />
      </div>
    </footer>
  );
}
