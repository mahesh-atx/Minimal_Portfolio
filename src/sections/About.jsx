import { motion } from 'framer-motion';
import { Sparkles, MapPin } from 'lucide-react';
import { ABOUT } from '../data';
import { fadeSlideUp } from '../animations';
import ColoredBio from '../components/ColoredBio';

export default function About() {
  return (
    <div className="flex flex-col gap-[44px]">
      <motion.div variants={fadeSlideUp} className="flex flex-col gap-[16px]">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#7c3aed] dark:text-[#a78bfa]" />
          <h3 className="text-[20px] font-medium leading-[1.4] text-black">My Story</h3>
        </div>
        <p className="text-[15px] font-normal leading-[1.7] text-muted">
          <ColoredBio text={ABOUT.bio} />
        </p>
        <div className="flex items-center gap-1.5 text-[13px] text-subtle mt-1">
          <MapPin className="w-3.5 h-3.5" />
          <span>{ABOUT.location}</span>
        </div>
      </motion.div>

      <motion.div variants={fadeSlideUp} className="flex flex-col gap-[14px]">
        <h4 className="text-[12px] uppercase tracking-wider font-bold text-subtle">Focus Areas</h4>
        <div className="flex flex-wrap gap-2">
          {ABOUT.focus.map((f) => (
            <span key={f} className="text-[13px] font-medium px-3 py-1.5 rounded-full bg-black/[0.05] dark:bg-white/10 text-black/75 dark:text-[#cfcfcf]">{f}</span>
          ))}
        </div>
      </motion.div>

      <div className="flex flex-col gap-[20px]">
        <motion.h3 variants={fadeSlideUp} className="text-[12px] uppercase tracking-wider font-bold text-subtle">
          Education
        </motion.h3>
        <div className="flex flex-col">
          {ABOUT.education.map((edu) => (
            <motion.div
              variants={fadeSlideUp}
              whileHover={{ x: 6 }}
              transition={{ type: 'spring', stiffness: 300, damping: 24 }}
              key={edu.id}
              className="relative py-6 border-b border-[#eeeeee] last:border-0 first:pt-0 flex flex-col md:flex-row gap-2 md:gap-8 group"
            >
              <div className="w-full md:w-32 flex-shrink-0 mt-0.5">
                <span className="text-[14px] text-subtle font-normal">{edu.duration}</span>
              </div>
              <div className="flex-1 space-y-2">
                <h4 className="text-[17px] font-medium text-black">
                  {edu.degree}
                </h4>
                <p className="text-[15px] font-normal leading-[1.6] text-muted">{edu.institution}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
