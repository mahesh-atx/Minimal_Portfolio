import { motion } from 'framer-motion';
import { WORK_PROCESS } from '../data';
import { fadeSlideUp, staggerContainer } from '../animations';
import RevealHeading from '../components/RevealHeading';

export default function Process() {
  return (
    <motion.section
      variants={fadeSlideUp}
      aria-labelledby="process-heading"
      className="flex flex-col gap-[18px]"
    >
      <motion.h3
        id="process-heading"
        variants={fadeSlideUp}
        className="text-[12px] uppercase tracking-[0.16em] font-bold text-subtle"
      >
        <RevealHeading>Work process</RevealHeading>
      </motion.h3>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
        className="relative grid grid-cols-5 gap-[14px] pt-[30px] max-[809px]:flex max-[809px]:flex-col max-[809px]:gap-[18px] max-[809px]:pl-[28px] max-[809px]:pt-0"
      >
        <motion.span
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          aria-hidden="true"
          className="pointer-events-none absolute left-[10%] right-[10%] top-[8px] origin-left h-px bg-black/15 dark:bg-white/15 max-[809px]:hidden"
        />
        <motion.span
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          aria-hidden="true"
          className="pointer-events-none absolute bottom-[8px] left-[8px] top-[8px] origin-top w-px bg-black/15 dark:bg-white/15 min-[810px]:hidden"
        />

        {WORK_PROCESS.map((step) => (
          <motion.article
            key={step.id}
            variants={fadeSlideUp}
            className="relative min-w-0 max-[809px]:pl-[18px]"
          >
            <span
              aria-hidden="true"
              className="absolute left-1/2 top-[-28px] h-[12px] w-[12px] -translate-x-1/2 rounded-full bg-[#A3B565] max-[809px]:left-[-25px] max-[809px]:top-[4px] max-[809px]:translate-x-0"
            />
            <span className="text-[10px] font-medium tracking-[0.12em] text-subtle">
              0{step.id}
            </span>
            <h4 className="mt-[8px] text-[16px] font-medium leading-[1.2] text-black">
              <RevealHeading>{step.title}</RevealHeading>
            </h4>
            <p className="mt-[8px] text-[13px] leading-[1.5] text-muted">
              {step.description}
            </p>
          </motion.article>
        ))}
      </motion.div>
    </motion.section>
  );
}
