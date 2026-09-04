import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { EXPERIENCE } from '../data';
import { fadeSlideUp } from '../animations';

export default function Experience() {
  return (
    <div className="flex flex-col gap-[16px]">
      <motion.h3 variants={fadeSlideUp} className="text-[12px] uppercase tracking-[0.16em] font-bold text-subtle">
        Experience
      </motion.h3>

      <div className="flex flex-col gap-[12px]">
        {EXPERIENCE.map((exp) => (
          <motion.div
            variants={fadeSlideUp}
            whileHover={{ y: -3 }}
            transition={{ type: 'spring', stiffness: 320, damping: 22 }}
            key={exp.id}
            className="group/exp flex items-center gap-[14px] md:gap-[22px] p-[16px] md:p-[18px] rounded-[14px] border border-black/[0.05] dark:border-white/10 bg-white shadow-card transition-colors duration-300 hover:border-black/15 dark:hover:border-white/20"
          >
            {/* Index dot — inverts on hover */}
            <span className="shrink-0 flex items-center justify-center w-[26px] h-[26px] rounded-full border border-black/10 dark:border-white/15 text-[10.5px] font-bold text-black/40 dark:text-white/40 transition-colors duration-300 group-hover/exp:bg-black group-hover/exp:text-white group-hover/exp:border-black dark:group-hover/exp:!bg-white dark:group-hover/exp:!text-black dark:group-hover/exp:!border-white">
              0{exp.id}
            </span>

            {/* Duration column */}
            <div className="hidden md:flex w-[132px] shrink-0 flex-col gap-[2px]">
              <span className="text-[13px] font-medium text-subtle leading-[1.4]">{exp.period}</span>
              <span className="text-[12px] text-black/40 dark:text-white/40">{exp.span}</span>
            </div>

            {/* Body */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-[10px]">
                <div className="min-w-0">
                  <h4 className="text-[15.5px] font-medium leading-[1.4] text-black">
                    {exp.role}
                    <span className="text-muted font-normal"> · {exp.company}</span>
                  </h4>
                  <p className="text-[13.5px] mt-[3px] leading-[1.5] text-muted">
                    {exp.location}
                    <span className="md:hidden"> · {exp.period} ({exp.span})</span>
                  </p>
                </div>
                <ArrowUpRight
                  className="shrink-0 w-[15px] h-[15px] text-subtle opacity-0 translate-x-[-4px] translate-y-[4px] group-hover/exp:opacity-100 group-hover/exp:translate-x-0 group-hover/exp:translate-y-0 transition-all duration-300"
                  aria-hidden="true"
                />
              </div>
              <p className="text-[14px] mt-[8px] leading-[1.55] text-muted line-clamp-2">
                {exp.summary}
              </p>
              <p className="text-[12.5px] font-medium mt-[8px] tracking-[0.02em] text-black/45 dark:text-white/45">
                {exp.tech.join(' · ')}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
