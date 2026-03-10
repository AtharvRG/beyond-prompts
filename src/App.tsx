import { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { ThemeProvider } from './theme/theme-provider';
import SmoothScroll from './components/SmoothScroll';
import GlobalCursor from './components/GlobalCursor';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Structure from './components/Structure';
import Prizes from './components/Prizes';
import Judges from './components/Judges';
import Footer from './components/Footer';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      window.scrollTo(0, 0);
    }
  }, [isLoading]);

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem enableColorScheme={false} disableTransitionOnChange>
      {/* Standalone Cursor (No longer wraps the app) */}
      <GlobalCursor />

      <AnimatePresence mode="wait">
        {isLoading && <Loader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <SmoothScroll>
        <div className="bg-bg-primary min-h-[100dvh] selection:bg-accent selection:text-bg-primary">
          {!isLoading && <Navbar />}

          <main>
            <Hero />
            <Structure />
            <Prizes />
            <Judges />
          </main>

          <Footer />
        </div>
      </SmoothScroll>

      <div className="fixed inset-x-0 bottom-0 z-40 h-[10dvh] md:h-[15dvh] pointer-events-none">
      </div>
    </ThemeProvider>
  );
}