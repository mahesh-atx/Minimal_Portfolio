import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import avatarImg from '../avatar.webp';
import { SOCIALS } from '../data';
import { fadeSlideUp, staggerContainer } from '../animations';
import AnimatedWords from '../components/AnimatedWords';
import Magnetic from '../components/Magnetic';

export default function Hero({ dark, setDark, handleCopyEmail }) {
  return (
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
      <motion.div variants={fadeSlideUp} className="flex flex-col gap-[8px] w-full">
        <h2 className="text-[30px] max-[809px]:text-[25px] font-medium leading-[1.3] text-black">
          <AnimatedWords text="Hey, I'm" className="inline" />{' '}
          <AnimatedWords
            text="Mahesh Dongare."
            gradient
            className="font-serif-accent inline text-[1.1em] font-normal"
          />
        </h2>
        <AnimatedWords
          text="I'm a Data Science, AI & ML Enthusiast."
          className="text-[18px] max-[809px]:text-[16px] font-medium leading-[1.45] text-black/60 block"
        />
        <AnimatedWords
          text="I spend most of my time building intelligent systems."
          className="text-[18px] max-[809px]:text-[16px] font-medium leading-[1.45] text-black/60 block"
        />
        <motion.div variants={fadeSlideUp} className="mt-[10px]">
          <span className="inline-flex items-center gap-[8px] px-[12px] py-[6px] rounded-full border border-black/10 dark:border-white/15 bg-white dark:!bg-white/[0.06] shadow-card">
            <span className="relative flex h-[7px] w-[7px]">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex h-[7px] w-[7px] rounded-full bg-emerald-500" />
            </span>
            <span className="text-[12.5px] font-medium text-black/60 dark:text-[#b8b8b8]">Available for new opportunities</span>
          </span>
        </motion.div>
      </motion.div>
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
  );
}
