import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, AnimatePresence, MotionConfig } from 'framer-motion';
import './index.css';

import { TABS } from './data';
import { getTabId } from './utils';
import { tabPanel } from './animations';

import Hero from './sections/Hero';
import Nav from './sections/Nav';
import Ventures from './sections/Ventures';
import About from './sections/About';
import Experience from './sections/Experience';
import TechStack from './sections/TechStack';
import Connect from './sections/Connect';
import Footer from './sections/Footer';
import CursorFollower from './components/CursorFollower';

// --- Main App ---

function getInitialTheme() {
  try {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
  } catch {
    // Fall back to the operating-system preference when storage is unavailable.
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function App() {
  const [activeTab, setActiveTab] = useState('Ventures');
  const [copied, setCopied] = useState(false);
  const [dark, setDark] = useState(getInitialTheme);

  useEffect(() => {
    try {
      localStorage.setItem('theme', dark ? 'dark' : 'light');
    } catch {
      // Theme switching still works when storage is unavailable.
    }
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(t);
  }, [copied]);

  const handleCopyEmail = async (event, email) => {
    event.preventDefault();

    if (!navigator.clipboard?.writeText) {
      window.location.href = `mailto:${email}`;
      return;
    }

    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  const handleTabKeyDown = (event) => {
    const currentIndex = TABS.indexOf(activeTab);
    let nextIndex;

    if (event.key === 'ArrowRight') nextIndex = (currentIndex + 1) % TABS.length;
    if (event.key === 'ArrowLeft') nextIndex = (currentIndex - 1 + TABS.length) % TABS.length;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = TABS.length - 1;
    if (nextIndex === undefined) return;

    event.preventDefault();
    const nextTab = TABS[nextIndex];
    setActiveTab(nextTab);
    requestAnimationFrame(() => document.getElementById(`tab-${getTabId(nextTab)}`)?.focus());
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className={`${dark ? 'bg-[#111111]' : 'bg-[#f9f9f9]'} min-h-screen text-black dark:text-[#e8e8e8] font-custom selection:bg-gray-200 dark:selection:bg-gray-600 transition-colors duration-300`}>
        <main className="flex justify-center px-0">
        <div className="w-[700px] max-[809px]:w-[90%] pt-[170px] pb-0 max-[809px]:pt-[140px] max-[809px]:pb-0 flex flex-col gap-[80px] max-[809px]:gap-[60px]">
          <Nav activeTab={activeTab} setActiveTab={setActiveTab} onKeyDown={handleTabKeyDown} dark={dark} setDark={setDark} />

          <Hero />

          {/* Tab Content */}
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeTab}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={tabPanel}
              id={`panel-${getTabId(activeTab)}`}
              role="tabpanel"
              aria-labelledby={`tab-${getTabId(activeTab)}`}
              tabIndex={0}
              className="min-h-[400px] focus:outline-none"
            >
              <h2 className="sr-only">{activeTab}</h2>
              {activeTab === 'Ventures' && <Ventures />}
              {activeTab === 'About' && <About />}
              {activeTab === 'Experience' && <Experience />}
              {activeTab === 'Tech Stack' && <TechStack dark={dark} />}
              {activeTab === 'Connect' && <Connect dark={dark} handleCopyEmail={handleCopyEmail} />}
            </motion.div>
          </AnimatePresence>

          <Footer />
        </div>
      </main>

      {/* Top blur gradient overlay behind the fixed navbar (8 progressive layers like Framer's BlurGradient) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.8 }}
        className="fixed top-0 left-0 right-0 h-[110px] pointer-events-none z-[5] overflow-hidden"
      >
        {Array.from({ length: 8 }).map((_, i) => {
          const blurPx = (i + 1) * (8 / 8);
          const top = `${(i / 8) * 100}%`;
          const bottom = `${((i + 1) / 8) * 100}%`;
          return (
            <div
              key={i}
              className="absolute inset-0"
              style={{
                backdropFilter: `blur(${blurPx}px)`,
                WebkitBackdropFilter: `blur(${blurPx}px)`,
                maskImage: `linear-gradient(to bottom, black ${top}, transparent ${bottom})`,
                WebkitMaskImage: `linear-gradient(to bottom, black ${top}, transparent ${bottom})`,
              }}
            />
          );
        })}
      </motion.div>
      {/* Bottom blur gradient overlay (8 progressive layers like Framer's BlurGradient) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.8 }}
        className="fixed bottom-0 left-0 right-0 h-[90px] pointer-events-none z-[5] overflow-hidden"
      >
        {Array.from({ length: 8 }).map((_, i) => {
          const blurPx = (i + 1) * (8 / 8);
          const top = `${(i / 8) * 100}%`;
          const bottom = `${((i + 1) / 8) * 100}%`;
          return (
            <div
              key={i}
              className="absolute inset-0"
              style={{
                backdropFilter: `blur(${blurPx}px)`,
                WebkitBackdropFilter: `blur(${blurPx}px)`,
                maskImage: `linear-gradient(to bottom, transparent ${top}, black ${bottom})`,
                WebkitMaskImage: `linear-gradient(to bottom, transparent ${top}, black ${bottom})`,
              }}
            />
          );
        })}
      </motion.div>
      {/* Noise/grain overlay */}
      <div
        className="fixed inset-0 z-[60] pointer-events-none opacity-[0.20] mix-blend-multiply dark:mix-blend-screen"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='150'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`
        }}
      />
      <CursorFollower />
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 24 }}
            role="status"
            aria-live="polite"
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[80] px-4 py-2 rounded-full bg-black dark:bg-white text-white dark:text-black text-[13px] font-medium shadow-float"
          >
            Copied!
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </MotionConfig>
  );
}

createRoot(document.getElementById('root')).render(<App />);
