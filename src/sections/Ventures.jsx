import { motion } from 'framer-motion';
import { VENTURES } from '../data';
import { fadeSlideUp, cardHover } from '../animations';
import ArrowIcon from '../components/ArrowIcon';
import copconnectImg from '../venture-copconnect.jpg';
import sanvadImg from '../venture-sanvad.jpg';

const IMAGES = { 1: copconnectImg, 2: sanvadImg };

export default function Ventures() {
  return (
    <div className="flex flex-col gap-[18px]">
      <motion.p
        variants={fadeSlideUp}
        className="text-[10px] uppercase tracking-[0.16em] font-bold text-subtle"
      >
        Featured projects
      </motion.p>

      {VENTURES.map((venture) => (
        <motion.a
          variants={fadeSlideUp}
          whileHover={cardHover}
          key={venture.id}
          href={venture.link}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex h-[190px] max-[809px]:h-[158px] w-full items-stretch overflow-hidden border border-[#d8eaf0] bg-[#eaf7fb] transition-colors hover:border-[#a9d4df] dark:border-white/10 dark:bg-[#1b2930] dark:hover:border-white/20"
        >
          <div className="flex w-[42%] min-w-0 shrink-0 flex-col justify-between p-[20px] max-[809px]:w-[45%] max-[809px]:p-[14px]">
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-[0.13em] text-[#5f8794] dark:text-[#9fb8c1]">
                {venture.year}
              </p>
              <h3 className="mt-[14px] truncate text-[24px] font-medium leading-none tracking-[-0.03em] text-[#12617c] max-[809px]:mt-[10px] max-[809px]:text-[18px] dark:text-[#82c9df]">
                {venture.title}
              </h3>
              <p className="mt-[14px] line-clamp-3 text-[13px] leading-[1.45] text-[#4f7480] max-[809px]:mt-[10px] max-[809px]:text-[11.5px] dark:text-[#b2c6cc]">
                {venture.description}
              </p>
            </div>

            <span className="inline-flex w-fit items-center gap-[5px] text-[10px] font-medium uppercase tracking-[0.08em] text-[#12617c] dark:text-[#9bd7e8]">
              {venture.cta}
              <ArrowIcon className="h-[10px] w-[10px] transition-transform duration-300 group-hover:translate-x-[3px] group-hover:translate-y-[-2px]" />
            </span>
          </div>

          <div className="relative min-w-0 flex-1 overflow-hidden p-[18px] max-[809px]:p-[10px]">
            <img
              src={IMAGES[venture.id]}
              alt={`${venture.title} preview`}
              loading="lazy"
              decoding="async"
              className="h-full w-full rounded-[10px] object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            />
          </div>
        </motion.a>
      ))}
    </div>
  );
}
