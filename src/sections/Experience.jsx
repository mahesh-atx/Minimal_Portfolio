import { motion } from 'framer-motion';
import { EXPERIENCE } from '../data';
import { fadeSlideUp } from '../animations';

export default function Experience() {
  return (
    <div className="flex flex-col gap-[40px]">
      <div className="flex flex-col gap-[26px]">
        <motion.h3 variants={fadeSlideUp} className="text-[12px] uppercase tracking-wider font-bold text-subtle">
          Experience
        </motion.h3>
        <div className="flex flex-col">
          {EXPERIENCE.map((exp) => (
            <motion.div
              variants={fadeSlideUp}
              whileHover={{ x: 6 }}
              transition={{ type: 'spring', stiffness: 300, damping: 24 }}
              key={exp.id}
              className="relative py-6 border-b border-[#eeeeee] last:border-0 first:pt-0 flex flex-col md:flex-row gap-4 md:gap-8 group"
            >
              <div className="flex md:flex-col items-center md:items-start gap-3 md:w-44 md:flex-shrink-0">
                <div className="w-10 h-10 rounded-[10px] bg-black dark:!bg-white text-white dark:!text-black font-bold flex items-center justify-center text-[13px] shadow-logo">{exp.initials}</div>
                <span className="text-[13px] text-subtle font-normal md:mt-1">{exp.duration}</span>
              </div>
              <div className="flex-1 space-y-2">
                <h4 className="text-[17px] font-medium text-black">
                  {exp.role} <span className="ml-1 px-2 py-[2px] rounded-[6px] bg-gray-100 font-medium text-black inline-block">at {exp.company}</span>
                </h4>
                <p className="text-[14px] font-normal text-subtle">{exp.location}</p>
                <ul className="space-y-2 pt-1">
                  {exp.bullets.map((bullet, idx) => (
                    <li key={idx} className="text-[15px] font-normal leading-[1.6] text-muted flex gap-2">
                      <span className="flex-shrink-0">•</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2 pt-2">
                  {exp.tech.map((t) => (
                    <span key={t} className="text-[12px] font-medium px-2.5 py-1 rounded-full bg-black/[0.05] dark:bg-white/10 text-black/70 dark:text-[#cfcfcf]">{t}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
