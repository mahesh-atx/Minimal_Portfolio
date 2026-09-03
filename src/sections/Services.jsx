import { motion } from 'framer-motion';
import { SERVICES } from '../data';
import { fadeSlideUp } from '../animations';
import Magnetic from '../components/Magnetic';

export default function Services() {
  return (
    <div className="flex flex-col gap-[40px]">
      <div className="grid grid-cols-2 max-[809px]:grid-cols-1 gap-4">
        {SERVICES.map((service) => {
          const Icon = service.icon;
          return (
            <motion.div
              variants={fadeSlideUp}
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 320, damping: 22 }}
              key={service.id}
              className="group relative bg-white rounded-[16px] shadow-card border border-black/[0.04] dark:border-white/10 p-6 overflow-hidden"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="w-11 h-11 rounded-[12px] bg-black/[0.05] dark:bg-white/10 text-black dark:!text-white flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </span>
                <span className="text-[13px] font-semibold text-subtle">{service.id}</span>
              </div>
              <h3 className="text-[17px] font-medium text-black">{service.title}</h3>
              <p className="text-[14px] leading-[1.6] text-muted mt-2">{service.description}</p>
            </motion.div>
          );
        })}
      </div>
      <motion.div variants={fadeSlideUp} className="flex items-center justify-center gap-[20px] mt-[10px]">
        <Magnetic strength={0.35} className="w-fit">
          <a
            href="mailto:dongaremahesh10@gmail.com?subject=Project%20inquiry"
            className="inline-flex items-center gap-[5px] px-3 py-[3px] rounded-full bg-black dark:!bg-white text-white dark:!text-black text-[14px] font-medium hover:bg-black/80 dark:hover:bg-white/80 transition-colors"
          >
            Discuss a project
          </a>
        </Magnetic>
        <Magnetic strength={0.35} className="w-fit">
          <a
            href="https://www.linkedin.com/in/mahesh-dongare-117b8a264/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-[5px] px-3 py-[3px] rounded-full border border-black text-black text-[14px] font-medium hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          >
            Connect on LinkedIn
          </a>
        </Magnetic>
      </motion.div>
    </div>
  );
}
