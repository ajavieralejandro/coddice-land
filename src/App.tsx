import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { Navbar } from './components/Navbar';
import { Process } from './components/Process';
import { Services } from './components/Services';
import { useReveal } from './hooks/useReveal';

export default function App() {
  useReveal();

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Process />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
