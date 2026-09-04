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
      {VENTURES.map((venture) => (
        <motion.a
          variants={fadeSlideUp}
          whileHover={cardHover}
          key={venture.id}
          href={venture.link}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex h-[150px] max-[809px]:h-[148px] items-stretch gap-[16px] max-[809px]:gap-[12px] bg-white rounded-[16px] shadow-card border border-black/[0.05] dark:border-white/10 p-[12px] transition-colors hover:border-black/10 dark:hover:border-white/20"
        >
          <div className="w-[30%] shrink-0 rounded-[10px] overflow-hidden bg-black/[0.04] dark:bg-white/10">
            <img
              src={IMAGES[venture.id]}
              alt={`${venture.title} preview`}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0 flex flex-col justify-center">
            <div className="flex items-baseline justify-between gap-[10px]">
              <h3 className="min-w-0 truncate text-[17px] max-[809px]:text-[16px] font-medium leading-[1.3] text-black">
                {venture.title}
              </h3>
              <span className="shrink-0 text-[13px] font-medium text-subtle">{venture.year}</span>
            </div>
            <p className="mt-[6px] h-[44px] overflow-hidden text-[14px] max-[809px]:text-[13.5px] leading-[1.55] text-muted line-clamp-2">
              {venture.description}
            </p>
            <div className="mt-[8px]">
              <span className="inline-flex items-center gap-[4px] w-fit px-2.5 py-[3px] rounded-full border border-black dark:border-white/30 text-[12px] font-medium text-black dark:!text-white group-hover:bg-black group-hover:text-white dark:group-hover:!bg-white dark:group-hover:!text-black transition-colors">
                {venture.cta}
                <span className="transition-transform duration-300 group-hover:translate-x-[2px] group-hover:translate-y-[-2px]">
                  <ArrowIcon className="w-[10px] h-[11px]" />
                </span>
              </span>
            </div>
          </div>
        </motion.a>
      ))}
    </div>
  );
}
