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
              <span className="w-[5px] h-[5px] rounded-full bg-[#A3B565]" aria-hidden="true" />
            </span>
          ))}
        </Marquee>
      </motion.div>

      {/* Education — spaced cards with arrow reveal */}
      <div className="flex flex-col gap-[20px]">
        <motion.h3 variants={fadeSlideUp} className="text-[12px] uppercase tracking-[0.16em] font-bold text-subtle">
          Education
        </motion.h3>
        <div className="relative flex flex-col gap-[16px] pl-[28px]">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-[14px] left-[8px] top-[14px] w-px bg-black/15 dark:bg-white/15"
          />
          {ABOUT.education.map((edu) => (
            <motion.div
              variants={fadeSlideUp}
              key={edu.id}
              className="group/edu relative flex items-start gap-[16px] md:gap-[30px] p-[20px] md:p-[24px] rounded-[16px] border border-black/[0.05] dark:border-white/10 bg-white shadow-card transition-colors duration-300 hover:border-black/15 dark:hover:border-white/20"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute left-[-26px] top-[27px] z-10 h-[12px] w-[12px] rounded-full bg-[#A3B565]"
              />
              <div className="hidden md:block w-[140px] shrink-0 pt-[2px]">
                <span className="text-[13.5px] font-medium text-black/70 dark:text-white/70 leading-[1.5]">{edu.duration}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-[12px]">
                  <h4 className="text-[16px] font-medium leading-[1.45] text-black">{edu.degree}</h4>
                  <ArrowUpRight
                    className="shrink-0 w-[16px] h-[16px] text-subtle opacity-0 translate-x-[-4px] translate-y-[4px] group-hover/edu:opacity-100 group-hover/edu:translate-x-0 group-hover/edu:translate-y-0 transition-all duration-300"
                    aria-hidden="true"
                  />
                </div>
                <p className="text-[14px] mt-[4px] leading-[1.55] text-muted">{edu.institution}</p>
                <span className="md:hidden text-[13px] text-subtle mt-[4px] block">{edu.duration}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
