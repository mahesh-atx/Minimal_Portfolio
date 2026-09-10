import { motion } from 'framer-motion';
import { VENTURES } from '../data';
import { fadeSlideUp, cardHover, staggerContainer } from '../animations';
import ArrowIcon from '../components/ArrowIcon';
import RevealHeading from '../components/RevealHeading';
import copconnectImg from '../venture-copconnect.png';
import sanvadImg from '../venture-sanvad.png';
const IMAGES = {
  1: copconnectImg,
  2: sanvadImg,
  3: '/project-insightflow.jpg',
  4: '/project-safesignal.png',
  5: '/project-querypilot.jpg',
};

export default function Ventures() {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={staggerContainer}
      className="flex flex-col gap-[20px]"
    >
      <motion.p
        variants={fadeSlideUp}
        className="text-[10px] uppercase tracking-[0.16em] font-bold text-subtle"
      >
        <RevealHeading>Featured projects</RevealHeading>
      </motion.p>

      {VENTURES.map((venture) => (
        <motion.a
          variants={fadeSlideUp}
          whileHover={cardHover}
          key={venture.id}
          href={venture.link}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex h-[242px] max-[809px]:h-[188px] w-full items-stretch overflow-hidden rounded-[18px] border border-black/[0.055] bg-white shadow-card transition-colors hover:border-black/10 dark:border-white/10 dark:bg-white/[0.04] dark:hover:border-white/20"
        >
          <div className="flex w-[38%] min-w-0 shrink-0 flex-col justify-between p-[22px] pr-[14px] max-[809px]:w-[44%] max-[809px]:p-[16px] max-[809px]:pr-[10px]">
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-[0.13em] text-subtle">
                {venture.year}
              </p>
              <h3 className="mt-[14px] truncate text-[26px] font-medium leading-none tracking-[-0.03em] text-black max-[809px]:mt-[10px] max-[809px]:text-[19px]">
                <RevealHeading>{venture.title}</RevealHeading>
              </h3>
              <p className="mt-[14px] line-clamp-3 text-[13.5px] leading-[1.5] text-muted max-[809px]:mt-[10px] max-[809px]:text-[11.8px]">
                {venture.description}
              </p>
            </div>

            <span className="inline-flex w-fit items-center gap-[5px] text-[10px] font-medium uppercase tracking-[0.08em] text-[#A3B565] transition-colors duration-300 group-hover:text-[#8da34f]">
              Visit
              <ArrowIcon className="h-[10px] w-[10px] transition-transform duration-300 group-hover:translate-x-[3px] group-hover:translate-y-[-2px]" />
            </span>
          </div>

          {/* Image docked to right + bottom — ~13% hidden right, ~7% hidden bottom, no padding on right/bottom, no zoom, rounded top-left */}
          <div className="relative min-w-0 flex-1 overflow-hidden">
            <div className="absolute bottom-0 right-0 left-[16px] top-[16px] overflow-hidden rounded-tl-[14px] max-[809px]:left-[10px] max-[809px]:top-[10px] max-[809px]:rounded-tl-[10px]">
              <img
                src={IMAGES[venture.id]}
                alt={`${venture.title} preview`}
                loading="lazy"
                decoding="async"
                className="absolute left-0 top-0 h-full w-full rounded-tl-[14px] max-[809px]:rounded-tl-[10px] object-cover object-left-top translate-x-[13%] translate-y-[7%]"
              />
            </div>
          </div>
        </motion.a>
      ))}
    </motion.div>
  );
}
