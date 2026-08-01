import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Linkedin,
  Mail,
  ArrowUpRight,
  Quote,
  Github,
  Instagram,
  MessageCircle,
  CalendarCheck,
  Sun,
  Moon
} from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import avatarImg from './avatar.jpg';

// --- Data Models ---
const TABS = ['Ventures', 'About', 'Experience', 'Services', 'Tech Stack', 'Connect'];

const ABOUT = {
  bio: "I'm a Data Science enthusiast with a passion for turning raw data into meaningful insights and intelligent systems. Over the years, I've explored machine learning, deep learning, and AI-driven applications, finding my sweet spot exactly where data meets intelligent decision-making.",
  education: [
    {
      id: 1,
      degree: 'Bachelor of Technology (B.Tech) — Computer Science and Engineering',
      institution: 'Amravati, Maharashtra',
      duration: 'August 2023 – June 2026 (Pursuing)'
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
      'Software Development: Contribute to the development and maintenance of internal software solutions.',
      'Security Focus: Gaining practical experience in developing secure, reliable applications within a high-stakes public safety environment.'
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
    logo: 'CC',
    icon: <MessageCircle className="w-5 h-5" strokeWidth={1.5} />,
    title: 'Akola CopConnect — WhatsApp ChatBot',
    description: 'Node.js & Express.js backend for a WhatsApp chatbot — webhook handling, session states and automated responses for faster cyber incident reporting.',
    link: 'https://github.com/mahesh-atx'
  },
  {
    id: 2,
    logo: 'SV',
    icon: <CalendarCheck className="w-5 h-5" strokeWidth={1.5} />,
    title: 'SP-e Samvaad — Appointment Booking Portal',
    description: 'Akola Police appointment booking portal built with Google Apps Script, Sheets, Calendar & Meet APIs — automated Meet invites and an admin dashboard.',
    link: 'https://akolapoliceevisit-code.github.io/SP-e-Sanvad/'
  }
];

const SERVICES = [
  { id: '01', title: 'Data Analysis & Visualization' },
  { id: '02', title: 'Machine Learning Model Development' },
  { id: '03', title: 'AI & LLM Integration (Chatbots, Automation)' },
  { id: '04', title: 'End-to-End Data Science Consulting' },
];

const CLIENTS = [
  {
    id: 1,
    quote: "The Basics Template is awesome! It's user-friendly & visually appealing. I was able to customize it effortlessly, which saved me so much time. Highly recommend it to anyone looking for simplicity and efficiency in their projects!",
    name: 'Emily Johnson',
    handle: '@framer',
    handleLink: 'https://framer.link/samar_jamil7',
    avatar: 'https://framerusercontent.com/images/9Lk5E2LzRWvodoFQsUue7JIjNQ.png?scale-down-to=512'
  },
  {
    id: 2,
    quote: "I absolutely love the Basics Template! It's perfect for organizing my tasks and projects. The layout is clean, making it easy to navigate. I appreciate the attention to detail. This template has become an essential tool in my daily routine!",
    name: 'Michael Smith',
    handle: '@contra',
    handleLink: 'https://contra.com',
    avatar: 'https://framerusercontent.com/images/hP4OZTExpzcvrBVis4rHqpgGYv4.png?scale-down-to=512'
  },
  {
    id: 3,
    quote: "The Basics Template is a game-changer! It helped me streamline my processes and stay focused. The design is sleek and modern, which keeps me motivated. I can't imagine working without it now. Truly a must-have for anyone seeking clarity in their work!",
    name: 'Jessica Brown',
    handle: '@framerit',
    handleLink: 'https://framerit.com',
    avatar: 'https://framerusercontent.com/images/3XeloZ245kmbOQObJmi0v0ZGE.png?scale-down-to=512'
  }
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
  { name: 'Github', handle: '@mahesh-atx', link: 'https://github.com/mahesh-atx', icon: <Github className="w-5 h-5" /> },
  { name: 'Linkedin', handle: 'mahesh-dongare', link: 'https://www.linkedin.com/in/mahesh-dongare-117b8a264/', icon: <Linkedin className="w-5 h-5" /> },
  { name: 'Email', handle: 'dongaremahesh10@gmail.com', link: 'mailto:dongaremahesh10@gmail.com', icon: <Mail className="w-5 h-5" /> },
];

const SOCIALS = [
  { link: 'https://www.instagram.com/___spike_07/', icon: <Instagram className="w-5 h-5" />, label: 'Instagram Icon' },
  { link: 'https://github.com/mahesh-atx', icon: <Github className="w-5 h-5" />, label: 'Github Icon' },
  { link: 'https://www.linkedin.com/in/mahesh-dongare-117b8a264/', icon: <Linkedin className="w-5 h-5" />, label: 'Linkedin Icon' },
  { link: 'mailto:dongaremahesh10@gmail.com', icon: <Mail className="w-5 h-5" />, label: 'Email Icon' },
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

function LaptopMockup({ title }) {
  return (
    <svg viewBox="0 0 320 220" fill="none" className="w-full h-full select-none pointer-events-none">
      <defs>
        <linearGradient id="screenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1a1a2e" />
          <stop offset="100%" stopColor="#16213e" />
        </linearGradient>
      </defs>
      <rect x="30" y="10" width="260" height="160" rx="8" fill="#2a2a2a" />
      <rect x="36" y="16" width="248" height="148" rx="4" fill="url(#screenGrad)" />
      <circle cx="160" cy="13" r="1.5" fill="#444" />
      <text x="160" y="80" fill="white" fontSize="14" fontFamily="Outfit, sans-serif" fontWeight="500" textAnchor="middle" opacity="0.9">
        {title}
      </text>
      <rect x="120" y="95" width="80" height="6" rx="3" fill="white" opacity="0.08" />
      <rect x="135" y="110" width="50" height="4" rx="2" fill="white" opacity="0.05" />
      <rect x="130" y="130" width="60" height="20" rx="4" fill="white" opacity="0.1" />
      <rect x="30" y="170" width="260" height="5" rx="2" fill="#c8c8c8" />
      <path d="M18,175 L302,175 L278,204 L42,204 Z" fill="#d9d9d9" />
      <path d="M42,204 L278,204 L276,210 L44,210 Z" fill="#b8b8b8" rx="2" />
      <rect x="140" y="193" width="40" height="6" rx="3" fill="none" stroke="#bbb" strokeWidth="0.5" />
    </svg>
  );
}

function AnimatedWords({ text, className }) {
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
          <motion.span key={i} variants={wordReveal} className="inline-block mr-[0.28em]">
            {word}
          </motion.span>
        );
      })}
    </motion.span>
  );
}

function LoadingSkeleton() {
  return (
    <main className="flex justify-center px-0">
      <div className="w-[700px] max-[809px]:w-[90%] py-[100px] max-[809px]:py-[80px] max-[809px]:pb-[100px] flex flex-col gap-[80px] max-[809px]:gap-[60px]">
        <div className="flex flex-col items-start gap-[30px] w-[420px] max-w-full">
          <div className="skeleton w-[60px] h-[60px] rounded-[15px]" />
          <div className="flex flex-col gap-[10px] w-full">
            <div className="skeleton h-[38px] max-[809px]:h-[33px] w-[330px] max-w-full rounded-[8px]" />
            <div className="skeleton h-[30px] max-[809px]:h-[26px] w-[290px] max-w-full rounded-[8px]" />
            <div className="skeleton h-[30px] max-[809px]:h-[26px] w-[250px] max-w-full rounded-[8px]" />
          </div>
          <div className="flex items-center gap-[15px] mt-[10px]">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="skeleton w-5 h-5 rounded-[6px]" />
            ))}
          </div>
        </div>
        <div className="flex items-center gap-[7px] w-full max-[809px]:flex-wrap max-[809px]:gap-[3px]">
          {TABS.map((t, i) => (
            <div key={t} className={`skeleton h-[26px] rounded-full ${i === 0 ? 'w-[86px]' : 'w-[72px]'}`} />
          ))}
        </div>
        <div className="flex flex-col gap-[30px]">
          {[0, 1].map((i) => (
            <div key={i} className="bg-white rounded-[10px] shadow-card p-[30px] max-[809px]:p-5 flex flex-col gap-[20px]">
              <div className="skeleton w-[35px] h-[35px] rounded-[10px]" />
              <div className="skeleton h-[24px] w-[240px] max-w-full rounded-[8px]" />
              <div className="skeleton h-[16px] w-full rounded-[8px]" />
              <div className="skeleton h-[16px] w-[75%] max-w-full rounded-[8px]" />
              <div className="skeleton h-[28px] w-[110px] rounded-full mt-[10px]" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

// --- Main App ---

function App() {
  const [activeTab, setActiveTab] = useState('Ventures');
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    localStorage.setItem('theme', dark ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(t);
  }, [copied]);

  const handleCopyEmail = (e, email) => {
    e.preventDefault();
    navigator.clipboard?.writeText(email).then(() => setCopied(true)).catch(() => {
      window.location.href = `mailto:${email}`;
    });
  };

  return (
    <div className={`${dark ? 'bg-[#111111]' : 'bg-[#f9f9f9]'} min-h-screen text-black dark:text-[#e8e8e8] font-custom selection:bg-gray-200 dark:selection:bg-gray-600 transition-colors duration-300`}>
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;700&family=Inter:wght@400&display=swap');

        .font-custom {
          font-family: 'Outfit', 'Inter', system-ui, -apple-system, sans-serif;
          letter-spacing: -0.02em;
        }

        html, body {
          background: #f9f9f9;
        }

        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }

        .shadow-card { box-shadow: 0px 2px 10px 0px rgba(0,0,0,0.05); }
        .shadow-logo { box-shadow: 0px 5px 12px 0px rgba(0,0,0,0.1); }
        .shadow-avatar { box-shadow: 0px 3px 12px 0px rgba(0,0,0,0.1); }
        .shadow-shot { box-shadow: -7px -5px 16px 0px rgba(0,0,0,0.03), 0px 17px 11px 0px rgba(0,0,0,0.03); }
        .shadow-float { box-shadow: 0 10px 15px rgba(0,0,0,0.13), 0 2px 4px rgba(0,0,0,0.05); }

        @media (pointer: coarse) {
          .cursor-follower { display: none !important; }
        }

        .dark .cursor-dot { background-color: #e8e8e8; }
        .dark .cursor-ring { border-color: rgba(232, 232, 232, 0.45); }

        @keyframes shimmer {
          0% { background-position: -400px 0; }
          100% { background-position: 400px 0; }
        }
        .skeleton {
          background: linear-gradient(90deg, #ececec 25%, #f6f6f6 37%, #ececec 63%);
          background-size: 800px 100%;
          animation: shimmer 1.3s infinite linear;
        }

        .dark { background-color: #111111; }
        .dark body { background-color: #111111; }
        .dark [class*="bg-white"] { background-color: #1b1b1b; }
        .dark [class*="bg-gray-100"] { background-color: #262626; }
        .dark [class*="bg-gray-200"] { background-color: #333333; }
        .dark [class*="text-black"] { color: #e8e8e8; }
        .dark [class*="border-[#eeeeee]"] { border-color: #2a2a2a; }
        .dark [class*="border-black"] { border-color: rgba(232,232,232,0.4); }
        .dark .shadow-card { box-shadow: 0px 2px 10px 0px rgba(0,0,0,0.4); }
        .dark .shadow-logo { box-shadow: 0px 5px 12px 0px rgba(0,0,0,0.5); }
        .dark .shadow-avatar { box-shadow: 0px 3px 12px 0px rgba(0,0,0,0.5); }
        .dark .shadow-shot { box-shadow: -7px -5px 16px 0px rgba(0,0,0,0.25), 0px 17px 11px 0px rgba(0,0,0,0.25); }
        .dark .skeleton {
          background: linear-gradient(90deg, #242424 25%, #2e2e2e 37%, #242424 63%);
          background-size: 800px 100%;
        }
      `}} />

      <main className="flex justify-center px-0">
        {loading ? (
          <LoadingSkeleton />
        ) : (
        <div className="w-[700px] max-[809px]:w-[90%] py-[100px] max-[809px]:py-[80px] max-[809px]:pb-[100px] flex flex-col gap-[80px] max-[809px]:gap-[60px]">
          {/* Hero */}
          <motion.header
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="flex flex-col items-start gap-[30px] w-[420px] max-w-full"
          >
            <motion.img
              variants={fadeSlideUp}
              whileHover={{ scale: 1.08, rotate: 3 }}
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
              src={avatarImg}
              alt="Mahesh Dongare portrait"
              className="w-[60px] h-[60px] rounded-[15px] object-cover border-2 border-white shadow-avatar"
            />
            <motion.div variants={fadeSlideUp} className="flex flex-col gap-[10px] w-full">
              <AnimatedWords
                text="Hey, I'm Mahesh Dongare."
                className="text-[25px] max-[809px]:text-[22px] font-medium leading-[1.5] text-black block"
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
              {SOCIALS.map((s, i) => (
                <Magnetic key={s.label} strength={0.4} className="inline-block">
                  <motion.a
                    variants={fadeSlideUp}
                    whileHover={{ y: -3, scale: 1.18, rotate: 4 }}
                    whileTap={{ scale: 0.88 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                    href={s.link}
                    target={s.link.startsWith('mailto:') ? undefined : '_blank'}
                    rel={s.link.startsWith('mailto:') ? undefined : 'noopener'}
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
                  aria-label="Toggle dark mode"
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
            className="-mt-[45px] max-[809px]:-mt-[30px] flex items-center gap-[7px] max-[809px]:flex-wrap max-[809px]:justify-center max-[809px]:gap-[3px] w-full"
          >
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`
                  relative px-3 max-[809px]:px-[10px] py-[3px] max-[809px]:py-[2px] rounded-full
                  text-[14px] max-[809px]:text-[13px] font-normal transition-colors duration-300 whitespace-nowrap
                  ${activeTab === tab ? 'text-white dark:!text-black' : 'text-black opacity-50 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/10'}
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
              className="min-h-[400px] -mt-[45px] max-[809px]:-mt-[30px]"
            >
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
                          <p className="text-[15px] font-normal leading-[1.6] text-black opacity-50">
                            {venture.description}
                          </p>
                        </div>
                        <Magnetic strength={0.3} className="w-fit">
                          <motion.a
                            href={venture.link}
                            target="_blank"
                            rel="noopener"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                            className="group/btn inline-flex items-center gap-[5px] px-3 py-[3px] rounded-full border border-black text-[14px] font-medium text-black hover:bg-black/5 dark:hover:bg-white/10 transition-colors mt-[10px]"
                          >
                            Visit site
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
                    <h2 className="text-[20px] font-medium leading-[1.4] text-black">My Story</h2>
                    <p className="text-[15px] font-normal leading-[1.6] text-black opacity-50">
                      {ABOUT.bio}
                    </p>
                  </motion.div>
                  <div className="flex flex-col gap-[30px]">
                    <motion.h3 variants={fadeSlideUp} className="text-[12px] uppercase tracking-wider font-bold text-black opacity-40">
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
                            <span className="text-[14px] text-black opacity-40 font-normal">{edu.duration}</span>
                          </div>
                          <div className="flex-1 space-y-2">
                            <h4 className="text-[17px] font-medium text-black">
                              {edu.degree}
                            </h4>
                            <p className="text-[15px] font-normal leading-[1.6] text-black opacity-50">{edu.institution}</p>
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
                    <motion.h3 variants={fadeSlideUp} className="text-[12px] uppercase tracking-wider font-bold text-black opacity-40">
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
                            <span className="text-[14px] text-black opacity-40 font-normal">{exp.duration}</span>
                          </div>
                          <div className="flex-1 space-y-2">
                            <h4 className="text-[17px] font-medium text-black">
                              {exp.role} <span className="ml-1 px-2 py-[2px] rounded-[6px] bg-gray-100 font-medium text-black inline-block">at {exp.company}</span>
                            </h4>
                            <p className="text-[14px] font-normal text-black opacity-40">{exp.location}</p>
                            <ul className="space-y-2 pt-1">
                              {exp.bullets.map((bullet, idx) => (
                                <li key={idx} className="text-[15px] font-normal leading-[1.6] text-black opacity-50 flex gap-2">
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
                          <span className="text-[17px] font-medium text-black opacity-40">{service.id}.</span>
                          <h4 className="text-[17px] font-medium text-black">{service.title}</h4>
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
                        href="https://cal.com/samar-jamil/15min"
                        target="_blank"
                        rel="noopener"
                        className="inline-flex items-center gap-[5px] px-3 py-[3px] rounded-full bg-black dark:!bg-white text-white dark:!text-black text-[14px] font-medium hover:bg-black/80 dark:hover:bg-white/80 transition-colors"
                      >
                        Book a call
                      </a>
                    </Magnetic>
                    <Magnetic strength={0.35} className="w-fit">
                      <a
                        href="mailto:hey@framerit.com"
                        className="inline-flex items-center gap-[5px] px-3 py-[3px] rounded-full border border-black text-black text-[14px] font-medium hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                      >
                        Send email
                      </a>
                    </Magnetic>
                  </motion.div>
                </div>
              )}

              {/* CLIENTS */}
              {activeTab === 'Clients' && (
                <div className="flex flex-col gap-0">
                  {CLIENTS.map((client) => (
                      <motion.div
                        variants={fadeSlideUp}
                        whileHover={{ x: 6 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                        key={client.id}
                        className="flex flex-col gap-[25px] pb-[30px] pt-[30px] border-b border-[#eeeeee] last:border-0"
                      >
                      <div className="flex gap-4 items-start">
                        <motion.div whileHover={{ rotate: -12, scale: 1.1 }} transition={{ type: 'spring', stiffness: 300, damping: 15 }}>
                          <Quote className="w-5 h-5 flex-shrink-0 mt-[4px] opacity-40 rotate-180 text-black" strokeWidth={0} fill="currentColor" />
                        </motion.div>
                        <p className="text-[18px] leading-[1.7] text-black">
                          "{client.quote}"
                        </p>
                      </div>
                      <div className="flex items-center gap-[15px] pl-9">
                        <motion.img
                          whileHover={{ scale: 1.1, rotate: 3 }}
                          transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                          src={client.avatar}
                          alt={client.name}
                          className="w-10 h-10 rounded-[12px] object-cover border-2 border-white shadow-avatar"
                        />
                        <span className="text-[17px] font-medium text-black">{client.name}</span>
                        <a
                          href={client.handleLink}
                          target="_blank"
                          rel="noopener"
                          className="ml-auto text-[13px] text-black opacity-50 hover:opacity-100 hover:underline transition-opacity"
                        >
                          {client.handle}
                        </a>
                      </div>
                    </motion.div>
                  ))}
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
                      rel="noopener"
                      key={idx}
                      className="group relative flex items-center justify-center gap-2 bg-white rounded-[10px] shadow-card border border-transparent hover:border-[#c4c4c4] h-[130px] transition-colors duration-300"
                    >
                        <img
                          src={tech.icon}
                          alt={tech.name}
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
                      rel={link.link.startsWith('mailto:') ? undefined : 'noopener'}
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
                      <span className="text-[15px] text-black opacity-40 font-normal">
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
        )}
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
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[80] px-4 py-2 rounded-full bg-black dark:bg-white text-white dark:text-black text-[13px] font-medium shadow-float"
          >
            Copied!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
