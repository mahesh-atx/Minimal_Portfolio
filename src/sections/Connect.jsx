import { motion } from 'framer-motion';
import { CONNECT_LINKS } from '../data';
import { fadeSlideUp, staggerContainer } from '../animations';
import Magnetic from '../components/Magnetic';
import ArrowIcon from '../components/ArrowIcon';
import RevealHeading from '../components/RevealHeading';
import PhotoCollage from '../components/PhotoCollage';

export default function Connect({ dark, handleCopyEmail }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={staggerContainer}
      className="flex flex-col gap-[14px]"
    >
      <motion.h3
        variants={fadeSlideUp}
        className="text-[12px] uppercase tracking-[0.16em] font-bold text-subtle"
      >
        <RevealHeading>Connect</RevealHeading>
      </motion.h3>

      {CONNECT_LINKS.map((link, idx) => {
        const Icon = link.icon;
        return (
          <motion.a
            variants={fadeSlideUp}
            whileHover={{ x: 6 }}
            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
            key={idx}
            href={link.link}
            target={link.link.startsWith('mailto:') ? undefined : '_blank'}
            rel={link.link.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
            onClick={link.link.startsWith('mailto:') ? (e) => handleCopyEmail(e, link.link.replace('mailto:', '')) : undefined}
            className="group flex items-center justify-between gap-4 px-4 py-4 rounded-[14px] bg-white shadow-card border border-black/[0.04] dark:border-white/10 hover:border-black/10 dark:hover:border-white/20 transition-colors"
          >
            <div className="flex items-center gap-4">
              <Magnetic strength={0.45} className="w-fit">
                <motion.div
                  whileHover={{ scale: 1.25, rotate: -8 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 14 }}
                  className="w-11 h-11 rounded-[12px] bg-black/[0.05] dark:bg-white/10 text-black dark:!text-white flex items-center justify-center"
                >
                  <Icon className="w-5 h-5" />
                </motion.div>
              </Magnetic>
              <div className="flex flex-col">
                <span className="font-medium text-[16px] text-black">{link.name}</span>
                <span className="text-[13px] text-[#A3B565]">{link.handle}</span>
              </div>
            </div>
            <span className="opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-[-4px] text-black">
              <ArrowIcon className="w-4 h-[18px]" />
            </span>
          </motion.a>
        );
      })}

      <motion.a
        variants={fadeSlideUp}
        href="/resume.pdf"
        download="Mahesh-Dongare-Resume.pdf"
        className="group inline-flex w-fit self-end items-center gap-[6px] px-0 py-0 text-[12px] font-medium text-[#A3B565] transition-colors duration-300 hover:text-[#8da34f] hover:underline hover:underline-offset-4"
      >
        Download résumé
        <ArrowIcon className="h-[13px] w-[13px] transition-transform duration-300 group-hover:translate-x-[2px] group-hover:translate-y-[-2px]" />
      </motion.a>

      <PhotoCollage />
    </motion.div>
  );
}
