import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Linkedin,
  Mail,
  ArrowUpRight,
  Github,
  Instagram,
  Sun,
  Moon
} from 'lucide-react';
import { motion, AnimatePresence, MotionConfig, useMotionValue, useSpring } from 'framer-motion';
import avatarImg from './avatar.webp';
import './index.css';

// --- Data Models ---
const TABS = ['Ventures', 'About', 'Experience', 'Services', 'Tech Stack', 'Connect'];

const ABOUT = {
  bio: "I'm a Data Science enthusiast with a passion for turning raw data into meaningful insights and intelligent systems. Over the years, I've explored machine learning, deep learning, and AI-driven applications, finding my sweet spot exactly where data meets intelligent decision-making.",
  education: [
    {
      id: 1,
      degree: 'Bachelor of Technology (B.Tech) — Computer Science and Engineering',
      institution: 'Sant Gadge Baba Amravati University, Amravati, Maharashtra',
      duration: 'August 2023 – June 2026'
    },
    {
      id: 2,
      degree: 'Diploma in — Computer Engineering',
      institution: 'Government Polytechnic Arvi, Maharashtra',
      duration: 'July 2020 – April 2022 (78.77%)'
    },
    {
      id: 3,
      degree: 'Higher Secondary Certificate (HSC) — Science',
      institution: 'Model Junior College of Science and Arts, Karanja (Ghadge), Maharashtra',
      duration: 'June 2019 – June 2020 (60%)'
    }
  ]
};

const EXPERIENCE = [
  {
    id: 1,
    role: 'Software Engineer Intern',
    company: 'Akola Police Cyber Cell',
    location: 'Akola, Maharashtra, India',
    duration: 'September 2025 – March 2026 (7 months)',
    bullets: [
      'Software Development: Contributed to the development and maintenance of internal software solutions.',
      'Security Focus: Gained practical experience developing secure, reliable applications in a high-stakes public safety environment.'
    ]
  },
  {
    id: 2,
    role: 'Internship Trainee',
    company: 'Xenosis IT Solutions',
    location: 'Nagpur, Maharashtra, India',
    duration: 'May 2024 – July 2024 (3 months)',
    bullets: [
      'Project Contribution: Successfully completed a 3-month intensive training program, contributing to live or simulated projects by applying foundational software development principles.',
      'Team Collaboration: Worked directly with an agile team to learn best practices in software development lifecycle (SDLC), code reviews, and version control.'
    ]
  }
];

const VENTURES = [
  {
    id: 1,
    title: 'Akola CopConnect — WhatsApp ChatBot',
    description: 'Node.js & Express.js backend for a WhatsApp chatbot — webhook handling, session states and automated responses for faster cyber incident reporting.',
    link: 'https://github.com/mahesh-atx',
    cta: 'View GitHub profile'
  },
  {
    id: 2,
    title: 'SP-e Samvaad — Appointment Booking Portal',
    description: 'Akola Police appointment booking portal built with Google Apps Script, Sheets, Calendar & Meet APIs — automated Meet invites and an admin dashboard.',
    link: 'https://akolapoliceevisit-code.github.io/SP-e-Sanvad/',
    cta: 'Visit site'
  }
];

const SERVICES = [
  { id: '01', title: 'Data Analysis & Visualization' },
  { id: '02', title: 'Machine Learning Model Development' },
  { id: '03', title: 'AI & LLM Integration (Chatbots, Automation)' },
  { id: '04', title: 'End-to-End Data Science Consulting' },
];


const TECH_STACK = [
  { name: 'Python', link: 'https://www.python.org/', icon: 'https://cdn.simpleicons.org/python' },
  { name: 'Pandas', link: 'https://pandas.pydata.org/', icon: 'https://cdn.simpleicons.org/pandas' },
  { name: 'NumPy', link: 'https://numpy.org/', icon: 'https://cdn.simpleicons.org/numpy' },
  { name: 'Scikit-learn', link: 'https://scikit-learn.org/', icon: 'https://cdn.simpleicons.org/scikitlearn' },
  { name: 'TensorFlow', link: 'https://www.tensorflow.org/', icon: 'https://cdn.simpleicons.org/tensorflow' },
  { name: 'PyTorch', link: 'https://pytorch.org/', icon: 'https://cdn.simpleicons.org/pytorch' },
  { name: 'MySQL', link: 'https://www.mysql.com/', icon: 'https://cdn.simpleicons.org/mysql' },
  { name: 'Jupyter', link: 'https://jupyter.org/', icon: 'https://cdn.simpleicons.org/jupyter' },
  { name: 'GitHub', link: 'https://github.com/', icon: 'https://cdn.simpleicons.org/github' },
];

const CONNECT_LINKS = [
  { name: 'Instagram', handle: '@___spike_07', link: 'https://www.instagram.com/___spike_07/', icon: <Instagram className="w-5 h-5" /> },
  { name: 'GitHub', handle: '@mahesh-atx', link: 'https://github.com/mahesh-atx', icon: <Github className="w-5 h-5" /> },
  { name: 'LinkedIn', handle: 'mahesh-dongare', link: 'https://www.linkedin.com/in/mahesh-dongare-117b8a264/', icon: <Linkedin className="w-5 h-5" /> },
  { name: 'Email', handle: 'dongaremahesh10@gmail.com', link: 'mailto:dongaremahesh10@gmail.com', icon: <Mail className="w-5 h-5" /> },
];

const SOCIALS = [
  { link: 'https://www.instagram.com/___spike_07/', icon: <Instagram className="w-5 h-5" />, label: 'Visit Mahesh on Instagram' },
  { link: 'https://github.com/mahesh-atx', icon: <Github className="w-5 h-5" />, label: 'Visit Mahesh on GitHub' },
  { link: 'https://www.linkedin.com/in/mahesh-dongare-117b8a264/', icon: <Linkedin className="w-5 h-5" />, label: 'Visit Mahesh on LinkedIn' },
  { link: 'mailto:dongaremahesh10@gmail.com', icon: <Mail className="w-5 h-5" />, label: 'Copy email address' },
];

// --- Animation Variants ---

const fadeSlideUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 24, mass: 0.8 }
  },
  exit: { opacity: 0, y: -20, transition: { duration: 0.2, ease: 'easeIn' } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 }
  },
  exit: {
    opacity: 0,
    transition: { staggerChildren: 0.05, staggerDirection: -1 }
  }
};

const wordReveal = {
  hidden: { opacity: 0, y: 16, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { type: 'spring', stiffness: 220, damping: 22 }
  }
};

const wordContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04, delayChildren: 0.1 } }
};

const cardHover = {
  y: -5,
  transition: { type: 'spring', stiffness: 320, damping: 22 }
};

// --- Components ---

function Magnetic({ children, strength = 0.3, className }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 200, damping: 15, mass: 0.1 });

  const handleMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      style={{ x: springX, y: springY }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function CursorFollower() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const [hovering, setHovering] = useState(false);

  const dotX = useSpring(x, { stiffness: 1500, damping: 50, mass: 0.2 });
  const dotY = useSpring(y, { stiffness: 1500, damping: 50, mass: 0.2 });
  const ringX = useSpring(x, { stiffness: 220, damping: 22, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 220, damping: 22, mass: 0.6 });

  useEffect(() => {
    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e) => {
      if (e.target.closest('a, button')) setHovering(true);
    };
    const out = (e) => {
      if (e.target.closest('a, button')) setHovering(false);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', over);
    window.addEventListener('mouseout', out);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
      window.removeEventListener('mouseout', out);
    };
  }, [x, y]);

  return (
    <>
      <motion.div
        className="cursor-follower cursor-dot fixed top-0 left-0 w-[8px] h-[8px] ml-[-4px] mt-[-4px] rounded-full bg-black pointer-events-none z-[100]"
        style={{ x: dotX, y: dotY }}
      />
      <motion.div
        className="cursor-follower cursor-ring fixed top-0 left-0 w-[36px] h-[36px] ml-[-18px] mt-[-18px] rounded-full border border-black/40 pointer-events-none z-[100]"
        style={{ x: ringX, y: ringY }}
        animate={{ scale: hovering ? 1.7 : 1, opacity: hovering ? 1 : 0.45 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      />
    </>
  );
}

function ArrowIcon({ className }) {
  return <ArrowUpRight className={className} strokeWidth={2} />;
}


function AnimatedWords({ text, className, gradient = false }) {
  const words = text.split(' ');
  return (
    <motion.span variants={wordContainer} className={className}>
      {words.map((word, i) => {
        const isDataScience = word === 'Data' && words[i + 1]?.toLowerCase().startsWith('science');
        if (isDataScience) {
          return (
            <motion.span key={i} variants={wordReveal} className="inline-block mr-[0.28em]">
              <span className="px-1.5 py-[2px] rounded-[6px] bg-gray-200 inline-block">
                {word} {words[i + 1]}
              </span>
            </motion.span>
          );
        }
        if (word.toLowerCase().startsWith('science,')) {
          return null;
        }
        return (
          <motion.span key={i} variants={wordReveal} className={`inline-block mr-[0.28em] ${gradient ? 'animated-gradient' : ''}`}>
            {word}
          </motion.span>
        );
      })}
    </motion.span>
  );
}

function ColoredBio({ text }) {
  return (
    <span>
      {text.split(' ').map((word, i) => (
        <span key={i} className={(i * 7 + 3) % 5 === 0 ? 'text-[#7c3aed] dark:text-[#a78bfa]' : ''}>
          {word}{' '}
        </span>
      ))}
    </span>
  );
}


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

const getTabId = (tab) => tab.toLowerCase().replaceAll(' ', '-');

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
        <div className="w-[700px] max-[809px]:w-[90%] py-[100px] max-[809px]:py-[80px] max-[809px]:pb-[100px] flex flex-col gap-[80px] max-[809px]:gap-[60px]">
          {/* Hero */}
          <motion.header
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="flex flex-col items-start gap-[30px] w-[420px] max-w-full"
          >
            <h1 className="sr-only">Mahesh Dongare — Data Science, AI & ML Portfolio</h1>
            <motion.img
              variants={fadeSlideUp}
              whileHover={{ scale: 1.08, rotate: 3 }}
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
              src={avatarImg}
              alt="Mahesh Dongare portrait"
              width="100"
              height="100"
              fetchPriority="high"
              className="w-[100px] h-[100px] rounded-[20px] object-cover border-2 border-white shadow-avatar"
            />
              <motion.div variants={fadeSlideUp} className="flex flex-col gap-[4px] w-full">
              <AnimatedWords
                text="Hey, I'm Mahesh Dongare."
                gradient
                className="text-[25px] max-[809px]:text-[22px] font-medium leading-[1.5] block"
              />
              <AnimatedWords
                text="I'm a Data Science, AI & ML Enthusiast."
                className="text-[20px] max-[809px]:text-[17px] font-medium leading-[1.35] text-black/60 block"
              />
              <AnimatedWords
                text="I spend most of my time building intelligent systems."
                className="text-[20px] max-[809px]:text-[17px] font-medium leading-[1.35] text-black/60 block"
              />
            </motion.div>
            <motion.div variants={fadeSlideUp} className="flex items-center gap-[15px] mt-[10px] text-black">
              {SOCIALS.map((s) => (
                <Magnetic key={s.label} strength={0.4} className="inline-block">
                  <motion.a
                    variants={fadeSlideUp}
                    whileHover={{ y: -3, scale: 1.18, rotate: 4 }}
                    whileTap={{ scale: 0.88 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                    href={s.link}
                    target={s.link.startsWith('mailto:') ? undefined : '_blank'}
                    rel={s.link.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                    onClick={s.link.startsWith('mailto:') ? (e) => handleCopyEmail(e, s.link.replace('mailto:', '')) : undefined}
                    aria-label={s.label}
                    className="block text-black hover:opacity-70 transition-opacity"
                  >
                    {s.icon}
                  </motion.a>
                </Magnetic>
              ))}
              <Magnetic strength={0.4} className="inline-block">
                <motion.button
                  onClick={() => setDark(!dark)}
                  variants={fadeSlideUp}
                  whileHover={{ y: -3, scale: 1.18, rotate: 20 }}
                  whileTap={{ scale: 0.88 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                  aria-label={`Switch to ${dark ? 'light' : 'dark'} mode`}
                  aria-pressed={dark}
                  className="block text-black dark:!text-white hover:opacity-70 transition-opacity"
                >
                  {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </motion.button>
              </Magnetic>
            </motion.div>
          </motion.header>

          {/* Tabs */}
          <motion.nav
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            role="tablist"
            aria-label="Portfolio sections"
            className="-mt-[45px] max-[809px]:-mt-[30px] flex items-center gap-[4px] max-[809px]:flex-wrap max-[809px]:justify-center max-[809px]:gap-[3px] w-full p-[5px] rounded-full bg-black/[0.04] dark:bg-white/[0.06] border border-black/[0.06] dark:border-white/10"
          >
            {TABS.map((tab) => (
              <button
                key={tab}
                id={`tab-${getTabId(tab)}`}
                type="button"
                role="tab"
                aria-selected={activeTab === tab}
                aria-controls={`panel-${getTabId(tab)}`}
                tabIndex={activeTab === tab ? 0 : -1}
                onClick={() => setActiveTab(tab)}
                onKeyDown={handleTabKeyDown}
                className={`
                  relative flex-1 max-[809px]:flex-none px-3 max-[809px]:px-[12px] py-[7px] max-[809px]:py-[6px] rounded-full
                  text-[14px] max-[809px]:text-[13px] font-medium transition-colors duration-300 text-center whitespace-nowrap
                  ${activeTab === tab ? 'text-white dark:!text-black' : 'text-subtle hover:text-black hover:bg-black/5 dark:hover:bg-white/10'}
                `}
              >
                {activeTab === tab && (
                  <motion.span
                    layoutId="tab-pill"
                    className="absolute inset-0 bg-black dark:!bg-white rounded-full"
                    transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                  />
                )}
                <span className="relative z-10">
                  {tab === 'Tech Stack' ? (
                    <>
                      <span className="max-[809px]:hidden">Tech Stack</span>
                      <span className="hidden max-[809px]:inline">Stack</span>
                    </>
                  ) : tab}
                </span>
              </button>
            ))}
          </motion.nav>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={staggerContainer}
              id={`panel-${getTabId(activeTab)}`}
              role="tabpanel"
              aria-labelledby={`tab-${getTabId(activeTab)}`}
              tabIndex={0}
              className="min-h-[400px] -mt-[45px] max-[809px]:-mt-[30px] focus:outline-none"
            >
              <h2 className="sr-only">{activeTab}</h2>
              {/* VENTURES */}
              {activeTab === 'Ventures' && (
                <div className="flex flex-col gap-[30px]">
                  {VENTURES.map((venture) => (
                    <motion.div
                      variants={fadeSlideUp}
                      whileHover={cardHover}
                      key={venture.id}
                      className="bg-white rounded-[10px] shadow-card flex flex-row max-[809px]:flex-col items-stretch overflow-visible max-[809px]:overflow-hidden group"
                    >
                      <div className="flex-1 p-[30px] max-[809px]:p-5 flex flex-col gap-[25px] items-start w-full max-[809px]:items-start max-[809px]:text-left z-10">
                        <Magnetic strength={0.35} className="w-fit">
                          <motion.div
                            whileHover={{ rotate: 8, scale: 1.1 }}
                            whileTap={{ scale: 0.92 }}
                            transition={{ type: 'spring', stiffness: 350, damping: 14 }}
                            className="w-[35px] h-[35px] rounded-[10px] bg-black dark:!bg-white text-white dark:!text-black text-[13px] font-bold shadow-logo flex items-center justify-center"
                          >
                            {String(venture.id).padStart(2, '0')}
                          </motion.div>
                        </Magnetic>
                        <div className="flex flex-col gap-[10px]">
                          <h3 className="text-[20px] font-medium leading-[1.4] text-black">{venture.title}</h3>
                          <p className="text-[15px] font-normal leading-[1.6] text-muted">
                            {venture.description}
                          </p>
                        </div>
                        <Magnetic strength={0.3} className="w-fit">
                          <motion.a
                            href={venture.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                            className="group/btn inline-flex items-center gap-[5px] px-3 py-[3px] rounded-full border border-black text-[14px] font-medium text-black hover:bg-black/5 dark:hover:bg-white/10 transition-colors mt-[10px]"
                          >
                            {venture.cta}
                            <span className="transition-transform duration-300 group-hover/btn:translate-x-[2px] group-hover/btn:translate-y-[-2px]">
                              <ArrowIcon className="w-3 h-[14px]" />
                            </span>
                          </motion.a>
                        </Magnetic>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* ABOUT */}
              {activeTab === 'About' && (
                <div className="flex flex-col gap-[50px]">
                  <motion.div variants={fadeSlideUp} className="flex flex-col gap-[20px]">
                    <h3 className="text-[20px] font-medium leading-[1.4] text-black">My Story</h3>
                    <p className="text-[15px] font-normal leading-[1.6] text-muted">
                      <ColoredBio text={ABOUT.bio} />
                    </p>
                  </motion.div>
                  <div className="flex flex-col gap-[30px]">
                    <motion.h3 variants={fadeSlideUp} className="text-[12px] uppercase tracking-wider font-bold text-subtle">
                      Education
                    </motion.h3>
                    <div className="flex flex-col">
                      {ABOUT.education.map((edu) => (
                        <motion.div
                          variants={fadeSlideUp}
                          whileHover={{ x: 6 }}
                          transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                          key={edu.id}
                          className="relative py-6 border-b border-[#eeeeee] last:border-0 first:pt-0 flex flex-col md:flex-row gap-2 md:gap-8 group"
                        >
                          <div className="w-full md:w-32 flex-shrink-0 mt-0.5">
                            <span className="text-[14px] text-subtle font-normal">{edu.duration}</span>
                          </div>
                          <div className="flex-1 space-y-2">
                            <h4 className="text-[17px] font-medium text-black">
                              {edu.degree}
                            </h4>
                            <p className="text-[15px] font-normal leading-[1.6] text-muted">{edu.institution}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* EXPERIENCE */}
              {activeTab === 'Experience' && (
                <div className="flex flex-col gap-[50px]">
                  <div className="flex flex-col gap-[30px]">
                    <motion.h3 variants={fadeSlideUp} className="text-[12px] uppercase tracking-wider font-bold text-subtle">
                      Experience
                    </motion.h3>
                    <div className="flex flex-col">
                      {EXPERIENCE.map((exp) => (
                        <motion.div
                          variants={fadeSlideUp}
                          whileHover={{ x: 6 }}
                          transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                          key={exp.id}
                          className="relative py-6 border-b border-[#eeeeee] last:border-0 first:pt-0 flex flex-col md:flex-row gap-2 md:gap-8 group"
                        >
                          <div className="w-full md:w-40 flex-shrink-0 mt-0.5">
                            <span className="text-[14px] text-subtle font-normal">{exp.duration}</span>
                          </div>
                          <div className="flex-1 space-y-2">
                            <h4 className="text-[17px] font-medium text-black">
                              {exp.role} <span className="ml-1 px-2 py-[2px] rounded-[6px] bg-gray-100 font-medium text-black inline-block">at {exp.company}</span>
                            </h4>
                            <p className="text-[14px] font-normal text-subtle">{exp.location}</p>
                            <ul className="space-y-2 pt-1">
                              {exp.bullets.map((bullet, idx) => (
                                <li key={idx} className="text-[15px] font-normal leading-[1.6] text-muted flex gap-2">
                                  <span className="flex-shrink-0">•</span>
                                  <span>{bullet}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* SERVICES */}
              {activeTab === 'Services' && (
                <div className="flex flex-col">
                  <div className="flex flex-col">
                    {SERVICES.map((service) => (
                      <motion.div
                        variants={fadeSlideUp}
                        whileHover={{ x: 8 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                        key={service.id}
                        className="group relative flex flex-col md:flex-row md:items-center justify-between py-6 px-4 -mx-4 rounded-[10px] border-b border-[#eeeeee] gap-4"
                      >
                        <div className="flex items-center gap-4">
                          <span className="text-[17px] font-medium text-subtle">{service.id}.</span>
                          <h3 className="text-[17px] font-medium text-black">{service.title}</h3>
                        </div>
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0 pointer-events-none text-black">
                          <ArrowIcon className="w-4 h-[18px]" />
                        </span>
                      </motion.div>
                    ))}
                  </div>
                  <motion.div variants={fadeSlideUp} className="flex items-center justify-center gap-[20px] mt-[60px]">
                    <Magnetic strength={0.35} className="w-fit">
                      <a
                        href="mailto:dongaremahesh10@gmail.com?subject=Project%20inquiry"
                        className="inline-flex items-center gap-[5px] px-3 py-[3px] rounded-full bg-black dark:!bg-white text-white dark:!text-black text-[14px] font-medium hover:bg-black/80 dark:hover:bg-white/80 transition-colors"
                      >
                        Discuss a project
                      </a>
                    </Magnetic>
                    <Magnetic strength={0.35} className="w-fit">
                      <a
                        href="https://www.linkedin.com/in/mahesh-dongare-117b8a264/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-[5px] px-3 py-[3px] rounded-full border border-black text-black text-[14px] font-medium hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                      >
                        Connect on LinkedIn
                      </a>
                    </Magnetic>
                  </motion.div>
                </div>
              )}


              {/* TECH STACK */}
              {activeTab === 'Tech Stack' && (
                <div className="grid grid-cols-3 max-[809px]:grid-cols-2 gap-5 max-[809px]:gap-[15px]">
                  {TECH_STACK.map((tech, idx) => (
                    <motion.a
                      variants={fadeSlideUp}
                      whileHover={{ y: -5 }}
                      whileTap={{ scale: 0.97 }}
                      transition={{ type: 'spring', stiffness: 320, damping: 20 }}
                      href={tech.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      key={idx}
                      className="group relative flex items-center justify-center gap-2 bg-white rounded-[10px] shadow-card border border-transparent hover:border-[#c4c4c4] h-[130px] transition-colors duration-300"
                    >
                        <img
                          src={dark && (tech.name === 'GitHub' || tech.name === 'Pandas') ? `${tech.icon}/white` : tech.icon}
                          alt={tech.name}
                          loading="lazy"
                          decoding="async"
                          className="w-[30px] h-[30px] rounded-lg object-cover transition-transform duration-300 group-hover:scale-125 group-hover:rotate-6"
                        />
                        <span className="text-[17px] font-medium text-black group-hover:underline underline-offset-4 decoration-1 transition-all duration-300">{tech.name}</span>
                        <span className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:top-[13px] group-hover:right-[13px] text-black">
                          <ArrowIcon className="w-4 h-[18px]" />
                        </span>
                      </motion.a>
                  ))}
                </div>
              )}

              {/* CONNECT */}
              {activeTab === 'Connect' && (
                <div className="flex flex-col">
                  {CONNECT_LINKS.map((link, idx) => (
                    <motion.a
                      variants={fadeSlideUp}
                      whileHover={{ x: 6 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                      key={idx}
                      href={link.link}
                      target={link.link.startsWith('mailto:') ? undefined : '_blank'}
                      rel={link.link.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                      onClick={link.link.startsWith('mailto:') ? (e) => handleCopyEmail(e, link.link.replace('mailto:', '')) : undefined}
                      className="group flex items-center justify-between h-11 px-3 -mx-3 rounded-[10px] border-b border-[#eeeeee] last:border-0 relative cursor-pointer"
                    >
                      <div className="flex items-center gap-[15px]">
                        <Magnetic strength={0.45} className="w-fit">
                          <motion.div
                            whileHover={{ scale: 1.25, rotate: -8 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 14 }}
                            className="text-black"
                          >
                            {link.icon}
                          </motion.div>
                        </Magnetic>
                        <span className="font-medium text-[17px] text-black">{link.name}</span>
                      </div>
                      <span className="max-w-[55%] truncate text-[15px] text-subtle font-normal">
                        {link.handle}
                      </span>
                      <span className="absolute right-0 opacity-0 group-hover:opacity-100 transition-all duration-300 -top-0 -right-2 pointer-events-none text-black">
                        <ArrowIcon className="w-4 h-[18px]" />
                      </span>
                    </motion.a>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

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
