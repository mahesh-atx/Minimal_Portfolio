import { motion } from 'framer-motion';
import { VENTURES } from '../data';
import { fadeSlideUp, cardHover } from '../animations';
import Magnetic from '../components/Magnetic';
import ArrowIcon from '../components/ArrowIcon';

export default function Ventures() {
  return (
    <div className="flex flex-col gap-[24px]">
      {VENTURES.map((venture) => (
        <motion.div
          variants={fadeSlideUp}
          whileHover={cardHover}
          key={venture.id}
          className="group bg-white rounded-[16px] shadow-card border border-black/[0.05] dark:border-white/10 p-[28px] max-[809px]:p-6 transition-colors hover:border-black/10 dark:hover:border-white/20"
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Magnetic strength={0.35} className="w-fit">
                <motion.div
                  whileHover={{ rotate: 8, scale: 1.1 }}
                  whileTap={{ scale: 0.92 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 14 }}
                  className="w-[38px] h-[38px] rounded-[11px] bg-black dark:!bg-white text-white dark:!text-black text-[13px] font-bold shadow-logo flex items-center justify-center"
                >
                  {String(venture.id).padStart(2, '0')}
                </motion.div>
              </Magnetic>
              <span className="text-[12px] font-medium uppercase tracking-wide text-subtle">{venture.tag}</span>
            </div>
            <span className="text-[12px] font-medium text-subtle">{venture.year}</span>
          </div>
          <h3 className="text-[21px] font-medium leading-[1.35] text-black mt-5">{venture.title}</h3>
          <p className="text-[15px] font-normal leading-[1.6] text-muted mt-2">
            {venture.description}
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            {venture.tech.map((t) => (
              <span key={t} className="text-[12px] font-medium px-2.5 py-1 rounded-full bg-black/[0.05] dark:bg-white/10 text-black/70 dark:text-[#cfcfcf]">{t}</span>
            ))}
          </div>
          <Magnetic strength={0.3} className="w-fit mt-5">
            <motion.a
              href={venture.link}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 18 }}
              className="group/btn inline-flex items-center gap-[5px] px-3.5 py-1.5 rounded-full border border-black text-[14px] font-medium text-black hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            >
              {venture.cta}
              <span className="transition-transform duration-300 group-hover/btn:translate-x-[2px] group-hover/btn:translate-y-[-2px]">
                <ArrowIcon className="w-3 h-[14px]" />
              </span>
            </motion.a>
          </Magnetic>
        </motion.div>
      ))}
    </div>
  );
}
