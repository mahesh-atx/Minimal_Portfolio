import { motion } from 'framer-motion';
import { MapPin, ArrowUpRight, Braces, BrainCircuit, Network, BarChart3, MessageSquare, Zap } from 'lucide-react';
import { ABOUT } from '../data';
import { fadeSlideUp, wordReveal, wordContainer } from '../animations';
import Marquee from '../components/Marquee';

// Icons via Lucide — the official shadcn/ui icon set.
const FOCUS_ICONS = {
  Python: Braces,
  'Machine Learning': BrainCircuit,
  'Deep Learning': Network,
  'Data Viz': BarChart3,
  LLMs: MessageSquare,
  Automation: Zap,
};

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

      {/* Single minimal monochrome strip — icon chips, scroll-velocity driven + skew */}
      <motion.div variants={fadeSlideUp} className="border-y border-[#eeeeee] py-[12px]">
        <Marquee baseVelocity={3}>
          {ABOUT.focus.map((item) => {
            const Icon = FOCUS_ICONS[item];
            return (
              <span key={item} className="group/item flex items-center whitespace-nowrap cursor-default">
                <span className="flex items-center gap-[10px] px-[14px] py-[6px] rounded-full transition-colors duration-300 group-hover/item:bg-black group-hover/item:text-white dark:group-hover/item:!bg-white dark:group-hover/item:!text-black">
                  <span className="flex items-center justify-center w-[24px] h-[24px] rounded-[8px] border border-black/10 dark:border-white/15 group-hover/item:border-white/30 dark:group-hover/item:border-black/20 transition-colors duration-300">
                    {Icon && <Icon className="w-[13px] h-[13px]" strokeWidth={1.75} aria-hidden="true" />}
                  </span>
                  <span className="text-[12.5px] font-medium uppercase tracking-[0.18em]">
                    {item}
                  </span>
                </span>
                <span className="w-[3px] h-[3px] rounded-full bg-black/20 dark:bg-white/25 mx-[6px]" aria-hidden="true" />
              </span>
            );
          })}
        </Marquee>
      </motion.div>

      {/* Education — numbered rows with hover highlight + arrow reveal */}
      <div className="flex flex-col gap-[16px]">
        <motion.h3 variants={fadeSlideUp} className="text-[12px] uppercase tracking-[0.16em] font-bold text-subtle">
          Education
        </motion.h3>
        <div className="flex flex-col">
          {ABOUT.education.map((edu) => (
            <motion.div
              variants={fadeSlideUp}
              key={edu.id}
              className="group/edu relative flex items-center gap-[14px] md:gap-[22px] py-[16px] px-[10px] -mx-[10px] rounded-[10px] border-b border-[#eeeeee] last:border-0 transition-colors duration-300 hover:bg-black/[0.03] dark:hover:bg-white/[0.05]"
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
