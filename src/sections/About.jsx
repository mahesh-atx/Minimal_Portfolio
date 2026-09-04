import { motion } from 'framer-motion';
import { MapPin, ArrowUpRight } from 'lucide-react';
import { ABOUT } from '../data';
import { fadeSlideUp, wordReveal, wordContainer } from '../animations';
import Marquee from '../components/Marquee';

function RevealText({ text, className }) {
  return (
    <motion.span variants={wordContainer} className={className}>
      {text.split(' ').map((word, i) => (
        <motion.span key={i} variants={wordReveal} className="inline-block mr-[0.26em]">
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}

export default function About() {
  return (
    <div className="flex flex-col gap-[32px]">
      {/* Header row */}
      <motion.div variants={fadeSlideUp} className="flex items-center justify-between gap-[12px]">
        <span className="text-[12px] uppercase tracking-[0.16em] font-bold text-subtle">Profile</span>
        <span className="flex items-center gap-[6px] text-[13px] font-medium text-subtle">
          <MapPin className="w-[14px] h-[14px]" />
          {ABOUT.location}
        </span>
      </motion.div>

      {/* Professional statement — word-by-word blur reveal + serif italic accent */}
      <p className="text-[24px] max-[809px]:text-[21px] font-medium leading-[1.45] text-black">
        <RevealText text={ABOUT.tagline.pre} className="inline" />
        <motion.span
          variants={wordReveal}
          className="font-serif-accent inline-block mr-[0.26em] text-[1.06em] font-normal"
        >
          {ABOUT.tagline.accent}
        </motion.span>
        <RevealText text={ABOUT.tagline.post} className="inline" />
      </p>

      {/* Single minimal strip — plain words, dark panel in dark mode, scroll-velocity driven */}
      <motion.div variants={fadeSlideUp} className="border-y border-[#eeeeee] dark:border-white/10 dark:bg-white/[0.04] py-[14px]">
        <Marquee baseVelocity={3}>
          {ABOUT.focus.map((item) => (
            <span key={item} className="flex items-center whitespace-nowrap">
              <span className="text-[14px] font-medium text-subtle px-[22px]">
                {item}
              </span>
              <span className="w-[4px] h-[4px] rounded-full bg-black/20 dark:bg-white/25" aria-hidden="true" />
            </span>
          ))}
        </Marquee>
      </motion.div>

      {/* Education — spaced cards with hover highlight + arrow reveal */}
      <div className="flex flex-col gap-[16px]">
        <motion.h3 variants={fadeSlideUp} className="text-[12px] uppercase tracking-[0.16em] font-bold text-subtle">
          Education
        </motion.h3>
        <div className="flex flex-col gap-[12px]">
          {ABOUT.education.map((edu) => (
            <motion.div
              variants={fadeSlideUp}
              key={edu.id}
              className="group/edu flex items-center gap-[14px] md:gap-[22px] p-[16px] md:p-[18px] rounded-[14px] border border-black/[0.05] dark:border-white/10 bg-white shadow-card transition-colors duration-300 hover:border-black/15 dark:hover:border-white/20"
            >
              <span className="shrink-0 w-[24px] text-[11px] font-bold tracking-wide text-black/30 dark:text-white/30">
                0{edu.id}
              </span>
              <span className="hidden md:block w-[140px] shrink-0 text-[13px] font-medium text-subtle">
                {edu.duration}
              </span>
              <div className="flex-1 min-w-0">
                <h4 className="text-[15.5px] font-medium leading-[1.4] text-black">{edu.degree}</h4>
                <p className="text-[13.5px] mt-[3px] leading-[1.5] text-muted">{edu.institution}</p>
                <span className="md:hidden text-[12.5px] text-subtle mt-[2px] block">{edu.duration}</span>
              </div>
              <ArrowUpRight
                className="shrink-0 w-[15px] h-[15px] text-subtle opacity-0 translate-x-[-4px] translate-y-[4px] group-hover/edu:opacity-100 group-hover/edu:translate-x-0 group-hover/edu:translate-y-0 transition-all duration-300"
                aria-hidden="true"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
