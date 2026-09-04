import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
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

      {/* Professional statement — word-by-word blur reveal */}
      <RevealText
        text={ABOUT.tagline}
        className="block text-[24px] max-[809px]:text-[21px] font-medium leading-[1.45] text-black"
      />

      {/* Focus areas marquee strip */}
      <motion.div variants={fadeSlideUp} className="border-y border-[#eeeeee] py-[13px]">
        <Marquee duration={26} pauseOnHover>
          {[...ABOUT.focus, ...ABOUT.focus].map((item) => (
            <span key={item} className="flex items-center">
              <span className="text-[13px] font-medium uppercase tracking-[0.18em] text-subtle whitespace-nowrap px-[16px]">
                {item}
              </span>
              <span className="text-[11px] text-black/25 dark:text-white/30" aria-hidden="true">✦</span>
            </span>
          ))}
        </Marquee>
      </motion.div>

      {/* Education */}
      <div className="flex flex-col gap-[16px]">
        <motion.h3 variants={fadeSlideUp} className="text-[12px] uppercase tracking-[0.16em] font-bold text-subtle">
          Education
        </motion.h3>
        <div className="flex flex-col">
          {ABOUT.education.map((edu) => (
            <motion.div
              variants={fadeSlideUp}
              whileHover={{ x: 6 }}
              transition={{ type: 'spring', stiffness: 300, damping: 24 }}
              key={edu.id}
              className="py-[18px] border-b border-[#eeeeee] last:border-0 flex flex-col md:flex-row gap-[4px] md:gap-[28px]"
            >
              <div className="w-full md:w-[150px] shrink-0">
                <span className="text-[13px] font-medium text-subtle">{edu.duration}</span>
              </div>
              <div className="flex-1">
                <h4 className="text-[16px] font-medium leading-[1.4] text-black">{edu.degree}</h4>
                <p className="text-[14px] mt-[3px] leading-[1.55] text-muted">{edu.institution}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Disciplines marquee strip — reversed, outlined display text */}
      <motion.div variants={fadeSlideUp} className="border-y border-[#eeeeee] py-[16px]">
        <Marquee reverse duration={38}>
          {[...ABOUT.disciplines, ...ABOUT.disciplines].map((item, i) => (
            <span key={i} className="flex items-center">
              <span className="text-outline text-[32px] max-[809px]:text-[24px] font-semibold uppercase tracking-[-0.02em] whitespace-nowrap px-[20px]">
                {item}
              </span>
              <span className="text-[14px] text-subtle" aria-hidden="true">✦</span>
            </span>
          ))}
        </Marquee>
      </motion.div>
    </div>
  );
}
