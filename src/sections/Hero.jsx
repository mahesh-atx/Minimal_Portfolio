import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import avatarImg from '../avatar.webp';
import { SOCIALS } from '../data';
import { fadeSlideUp, staggerContainer } from '../animations';
import AnimatedWords from '../components/AnimatedWords';
import Magnetic from '../components/Magnetic';
import Marquee from '../components/Marquee';

const ROTATING = ['intelligent systems.', 'machine learning models.', 'data-driven products.', 'LLM-powered tools.'];

export default function Hero({ handleCopyEmail }) {
  const [wordIdx, setWordIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setWordIdx((i) => (i + 1) % ROTATING.length), 2600);
    return () => clearInterval(t);
  }, []);

  // Cursor parallax — intro drifts gently for depth (avatar stays put)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });
  const introX = useTransform(sx, [-1, 1], [-6, 6]);
  const introY = useTransform(sy, [-1, 1], [-4, 4]);

  const handlePointerMove = (event) => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    mx.set(((event.clientX - rect.left) / rect.width) * 2 - 1);
    my.set(((event.clientY - rect.top) / rect.height) * 2 - 1);
  };

  const handlePointerLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.header
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="flex flex-col items-start gap-[30px] w-[420px] max-w-full"
    >
      <h1 className="sr-only">Mahesh Dongare — Data Science, AI & ML Portfolio</h1>

      {/* Avatar — static, original hover pop only */}
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

      {/* Intro — parallax wrapper around the staggered text block */}
      <motion.div style={{ x: introX, y: introY }} className="w-full">
        <motion.div variants={fadeSlideUp} className="flex flex-col gap-[6px] w-full">
          <h2 className="text-[30px] max-[809px]:text-[26px] font-medium leading-[1.15] tracking-[-0.02em] text-black">
            <AnimatedWords text="Hey, I'm" className="inline" />{' '}
            <AnimatedWords
              text="Mahesh Dongare."
              gradient
              className="font-serif-accent inline font-normal"
            />
          </h2>
          <AnimatedWords
            text="I'm a Data Science, AI & ML Enthusiast."
            className="text-[17px] max-[809px]:text-[15.5px] font-medium leading-[1.35] text-black/60 block"
          />
          <p className="text-[17px] max-[809px]:text-[15.5px] font-medium leading-[1.35] text-black/60">
            <AnimatedWords text="I spend most of my time building" className="inline" />{' '}
            <AnimatePresence mode="wait">
              <motion.span
                key={wordIdx}
                initial={{ opacity: 0, y: 10, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -10, filter: 'blur(6px)' }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="font-serif-accent inline-block text-black/80 dark:text-white/85"
              >
                {ROTATING[wordIdx]}
              </motion.span>
            </AnimatePresence>
          </p>
          <motion.div
            variants={fadeSlideUp}
            className="mt-[8px] w-[700px] max-[809px]:w-[90vw] overflow-hidden border-y border-black/10 dark:border-white/10 py-[10px]"
          >
            <Marquee baseVelocity={2.5}>
              <span className="flex shrink-0 items-center whitespace-nowrap text-[13px] font-medium tracking-[0.02em] text-subtle">
                Mahesh Dongare _ Data Science AI ML
                <span
                  aria-hidden="true"
                  className="mx-[32px] h-[4px] w-[4px] shrink-0 rounded-full bg-black/25 dark:bg-white/30"
                />
              </span>
            </Marquee>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Socials + theme toggle */}
      <motion.div variants={fadeSlideUp} className="flex items-center gap-[15px] mt-[10px] text-black">
        {SOCIALS.map((s) => {
          const Icon = s.icon;
          return (
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
                <Icon className="w-5 h-5" />
              </motion.a>
            </Magnetic>
          );
        })}
      </motion.div>
    </motion.header>
  );
}
