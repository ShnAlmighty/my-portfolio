import { Layout, ScrollToTop } from '@/components/layout';
import { Hero, About, Experience, Projects, Skills, Education, Contact } from '@/components/sections/index.lazy';
import { ScrollProgress } from '@/components/ui';

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Layout>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Contact />
      </Layout>
      <ScrollToTop />
    </>
  );
}
