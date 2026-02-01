import dynamic from 'next/dynamic';
import Hero from '@/components/Hero/Hero';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import HashScrollHandler from '@/components/HashScrollHandler';

const SkillsManifesto = dynamic(() => import('@/components/SkillsManifesto'), {
  loading: () => <div className="min-h-screen bg-black" />,
});
const About = dynamic(() => import('@/components/About'), {
  loading: () => <div className="min-h-screen bg-black" />,
});
const Projects = dynamic(() => import('@/components/Projects'), {
  loading: () => <div className="min-h-screen bg-black" />,
});
const Contact = dynamic(() => import('@/components/Contact'), {
  loading: () => <div className="min-h-screen bg-black" />,
});

export default function Home() {
  return (
    <>
      <HashScrollHandler />
      <Navbar />
      <Hero />
      <SkillsManifesto />
      <About />
      <Projects />
      <Contact />
      <Footer />
    </>
  );
}
