import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { EXPERIENCE } from '../data';
import { fadeSlideUp, staggerContainer } from '../animations';
import RevealHeading from '../components/RevealHeading';
import Marquee from '../components/Marquee';

const MARQUEE_IMAGES = [
  { src: '/marquee-1.jpg', alt: 'Outside work 1' },
  { src: '/marquee-2.jpg', alt: 'Outside work 2' },
  { src: '/marquee-3.jpg', alt: 'Outside work 3' },
  { src: '/marquee-4.jpg', alt: 'Outside work 4' },
  { src: '/marquee-5.jpg', alt: 'Outside work 5' },
  { src: '/marquee-6.jpg', alt: 'Outside work 6' },
];

export default function Experience() {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={staggerContainer}
      className="flex flex-col gap-[20px]"
    >
      <motion.h3 variants={fadeSlideUp} className="text-[12px] uppercase tracking-[0.16em] font-bold text-subtle">
        <RevealHeading>Experience</RevealHeading>
      </motion.h3>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
        className="relative flex flex-col gap-[16px] pl-[28px]"
      >
        <motion.span
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          aria-hidden="true"
          className="pointer-events-none absolute bottom-[14px] left-[8px] top-[14px] origin-top w-px bg-black/15 dark:bg-white/15"
        />
        {EXPERIENCE.map((exp) => (
          <motion.div
            variants={fadeSlideUp}
            whileHover={{ y: -3 }}
            transition={{ type: 'spring', stiffness: 320, damping: 22 }}
            key={exp.id}
            className="group/exp relative flex items-start gap-[16px] md:gap-[30px] p-[20px] md:p-[24px] rounded-[16px] border border-black/[0.05] dark:border-white/10 bg-white shadow-card transition-colors duration-300 hover:border-black/15 dark:hover:border-white/20"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-[-26px] top-[27px] z-10 h-[12px] w-[12px] rounded-full bg-[#A3B565]"
            />
            {/* Duration column */}
            <div className="hidden md:flex w-[140px] shrink-0 flex-col gap-[4px] pt-[2px]">
              <span className="text-[11px] font-medium tracking-[0.12em] text-[#A3B565]">{String(exp.id).padStart(2, '0')}</span>
              <span className="text-[13.5px] font-medium text-black/70 dark:text-white/70 leading-[1.4]">{exp.period}</span>
              <span className="text-[12.5px] text-black/40 dark:text-white/40">{exp.span}</span>
            </div>

            {/* Body */}
            <div className="flex-1 min-w-0">
              <span className="mb-[8px] block text-[11px] font-medium tracking-[0.12em] text-[#A3B565] md:hidden">{String(exp.id).padStart(2, '0')}</span>
              <div className="flex items-start justify-between gap-[12px]">
                <div className="min-w-0">
                  <h4 className="text-[16.5px] font-medium leading-[1.4] text-black">
                    <RevealHeading>{exp.role}</RevealHeading>
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
      </motion.div>

      {/* Polaroid-style image marquee — no container bg, each image like Connect PhotoCollage, slightly rotated */}
      <motion.div
        variants={fadeSlideUp}
        className="overflow-hidden py-[14px] max-[809px]:py-[10px]"
      >
        <Marquee baseVelocity={1.2} className="py-[14px]">
          {MARQUEE_IMAGES.map((img, idx) => {
            const rotationDeg = [-3, 2.5, -2, 3.5, -1.5, 2][idx % 6];
            return (
              <motion.figure
                key={idx}
                initial={{ rotate: rotationDeg, y: 0, scale: 1 }}
                animate={{ rotate: rotationDeg, y: 0, scale: 1 }}
                whileHover={{ rotate: 0, y: -4, scale: 1.04 }}
                transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                className="mx-[12px] shrink-0 bg-white p-[7px] pb-[18px] shadow-[0_10px_20px_rgba(0,0,0,0.16)] max-[809px]:mx-[8px] max-[809px]:p-[5px] max-[809px]:pb-[12px]"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  decoding="async"
                  className="h-[112px] w-[112px] object-cover max-[809px]:h-[88px] max-[809px]:w-[88px]"
                />
              </motion.figure>
            );
          })}
        </Marquee>
      </motion.div>
    </motion.div>
  );
}
