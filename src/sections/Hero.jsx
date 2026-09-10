import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import avatarImg from '../avatar.webp';
import { fadeSlideUp, staggerContainer } from '../animations';
import AnimatedWords from '../components/AnimatedWords';
import Marquee from '../components/Marquee';

const ROTATING = ['intelligent systems.', 'machine learning models.', 'data-driven products.', 'LLM-powered tools.'];

export default function Hero() {
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
      className="flex flex-row max-[809px]:flex-col items-start gap-[24px] w-full max-w-full max-[809px]:w-[420px] max-[809px]:gap-[30px]"
    >
      <div className="flex flex-col items-start gap-[30px] w-[420px] max-w-full shrink-0">
        <h1 className="sr-only">Mahesh Dongare — Data Science, AI & ML Portfolio</h1>

        {/* Avatar — slightly larger */}
        <motion.img
          variants={fadeSlideUp}
          whileHover={{ scale: 1.08, rotate: 3 }}
          transition={{ type: 'spring', stiffness: 300, damping: 15 }}
          src={avatarImg}
          alt="Mahesh Dongare portrait"
          width="114"
          height="114"
          fetchPriority="high"
          className="w-[114px] h-[114px] rounded-[22px] object-cover border-2 border-[#A3B565] shadow-avatar max-[809px]:w-[100px] max-[809px]:h-[100px] max-[809px]:rounded-[20px]"
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
                  initial={{ opacity: 0, y: 10, filter: 'blur(5px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -10, filter: 'blur(5px)' }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="font-serif-accent inline-block whitespace-nowrap text-[17px] max-[809px]:text-[15.5px] font-normal leading-[1.35] text-[#A3B565]"
                >
                  {ROTATING[wordIdx]}
                </motion.span>
              </AnimatePresence>
            </p>
            <motion.div
              variants={fadeSlideUp}
              className="mt-[8px] w-[700px] max-[809px]:w-[90vw] overflow-hidden border-y border-[#eeeeee] dark:border-white/10 dark:bg-white/[0.04] py-[14px]"
            >
              <Marquee baseVelocity={3}>
                <span className="flex items-center whitespace-nowrap">
                  <span className="text-[14px] font-medium text-subtle px-[22px]">
                    Mahesh Dongare _ Data Science AI ML
                  </span>
                  <span className="w-[5px] h-[5px] rounded-full bg-[#A3B565]" aria-hidden="true" />
                </span>
              </Marquee>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Right side — exactly like Connect PhotoCollage stacking (desktop only) */}
      <motion.div
        variants={fadeSlideUp}
        className="hidden min-[810px]:block relative w-[260px] h-[250px] shrink-0 ml-[6px] -mt-[2px]"
        aria-hidden="true"
      >
        {[
          { src: '/marquee-2.jpg', rot: -7, pos: 'left-[5%] top-[34px] w-[48%]', z: 10 },
          { src: '/marquee-3.jpg', rot: 7, pos: 'right-[5%] top-[0px] w-[48%]', z: 20 },
        ].map((p, i) => (
          <motion.figure
            key={p.src}
            initial={{ rotate: p.rot, y: 12, scale: 0.88, opacity: 0, zIndex: p.z }}
            animate={{ rotate: p.rot, y: 0, scale: 1, opacity: 1, zIndex: p.z }}
            whileHover={{ rotate: 0, y: -6, scale: 1.02, zIndex: 30 }}
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 22,
              delay: 0.12 * i,
            }}
            className={`absolute bg-white p-[6px] pb-[16px] shadow-[0_14px_26px_rgba(0,0,0,0.18)] ${p.pos}`}
          >
            <img src={p.src} alt="" loading="lazy" decoding="async" className="aspect-[4/3] w-full object-cover" />
          </motion.figure>
        ))}
      </motion.div>
    </motion.header>
  );
}
