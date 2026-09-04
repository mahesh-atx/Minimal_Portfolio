import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { EXPERIENCE } from '../data';
import { fadeSlideUp } from '../animations';

export default function Experience() {
  return (
    <div className="flex flex-col gap-[20px]">
      <motion.h3 variants={fadeSlideUp} className="text-[12px] uppercase tracking-[0.16em] font-bold text-subtle">
        Experience
      </motion.h3>

      <div className="flex flex-col gap-[16px]">
        {EXPERIENCE.map((exp) => (
          <motion.div
            variants={fadeSlideUp}
            whileHover={{ y: -3 }}
            transition={{ type: 'spring', stiffness: 320, damping: 22 }}
            key={exp.id}
            className="group/exp flex items-start gap-[16px] md:gap-[30px] p-[20px] md:p-[24px] rounded-[16px] border border-black/[0.05] dark:border-white/10 bg-white shadow-card transition-colors duration-300 hover:border-black/15 dark:hover:border-white/20"
          >
            {/* Duration column */}
            <div className="hidden md:flex w-[140px] shrink-0 flex-col gap-[3px] pt-[2px]">
              <span className="text-[13.5px] font-medium text-black/70 dark:text-white/70 leading-[1.4]">{exp.period}</span>
              <span className="text-[12.5px] text-black/40 dark:text-white/40">{exp.span}</span>
            </div>

            {/* Body */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-[12px]">
                <div className="min-w-0">
                  <h4 className="text-[16.5px] font-medium leading-[1.4] text-black">
                    {exp.role}
                  </h4>
                  <p className="text-[14px] mt-[4px] leading-[1.5] text-muted">
                    {exp.company} · {exp.location}
                    <span className="md:hidden"> · {exp.period}</span>
                  </p>
                </div>
                <ArrowUpRight
                  className="shrink-0 w-[16px] h-[16px] text-subtle opacity-0 translate-x-[-4px] translate-y-[4px] group-hover/exp:opacity-100 group-hover/exp:translate-x-0 group-hover/exp:translate-y-0 transition-all duration-300"
                  aria-hidden="true"
                />
              </div>
              <p className="text-[14.5px] mt-[14px] leading-[1.65] text-muted">
                {exp.summary}
              </p>
              <p className="text-[12.5px] font-medium mt-[14px] tracking-[0.02em] text-black/45 dark:text-white/45">
                {exp.tech.join(' · ')}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
