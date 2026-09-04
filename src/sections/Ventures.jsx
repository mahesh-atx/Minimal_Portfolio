import { motion } from 'framer-motion';
import { VENTURES } from '../data';
import { fadeSlideUp, cardHover } from '../animations';
import ArrowIcon from '../components/ArrowIcon';
import copconnectImg from '../venture-copconnect.jpg';
import sanvadImg from '../venture-sanvad.jpg';

const IMAGES = { 1: copconnectImg, 2: sanvadImg };

export default function Ventures() {
  return (
    <div className="flex flex-col gap-[20px]">
      {VENTURES.map((venture) => (
        <motion.a
          variants={fadeSlideUp}
          whileHover={cardHover}
          key={venture.id}
          href={venture.link}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-stretch gap-[20px] max-[809px]:gap-[14px] bg-white rounded-[16px] shadow-card border border-black/[0.05] dark:border-white/10 p-[14px] transition-colors hover:border-black/10 dark:hover:border-white/20"
        >
          <div className="w-[30%] shrink-0">
            <img
              src={IMAGES[venture.id]}
              alt={`${venture.title} preview`}
              loading="lazy"
              decoding="async"
              className="w-full h-full min-h-[110px] object-cover rounded-[10px]"
            />
          </div>
          <div className="flex-1 min-w-0 flex flex-col justify-center gap-[7px]">
            <h3 className="text-[17px] max-[809px]:text-[16px] font-medium leading-[1.3] text-black">
              {venture.title}
            </h3>
            <p className="text-[14px] leading-[1.55] text-muted line-clamp-2">
              {venture.description}
            </p>
            <div className="mt-[4px]">
              <span className="inline-flex items-center gap-[5px] w-fit px-3 py-[5px] rounded-full border border-black dark:border-white/30 text-[13px] font-medium text-black dark:!text-white group-hover:bg-black group-hover:text-white dark:group-hover:!bg-white dark:group-hover:!text-black transition-colors">
                {venture.cta}
                <span className="transition-transform duration-300 group-hover:translate-x-[2px] group-hover:translate-y-[-2px]">
                  <ArrowIcon className="w-3 h-[13px]" />
                </span>
              </span>
            </div>
          </div>
        </motion.a>
      ))}
    </div>
  );
}
