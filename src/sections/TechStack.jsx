import { motion } from 'framer-motion';
import { TECH_STACK } from '../data';
import { fadeSlideUp, staggerContainer } from '../animations';
import ArrowIcon from '../components/ArrowIcon';

export default function TechStack({ dark }) {
  const grouped = TECH_STACK.reduce((acc, t) => {
    (acc[t.category] = acc[t.category] || []).push(t);
    return acc;
  }, {});

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={staggerContainer}
      className="flex flex-col gap-[28px]"
    >
      {Object.entries(grouped).map(([category, items]) => (
        <motion.div variants={fadeSlideUp} key={category} className="flex flex-col gap-3">
          <h4 className="text-[12px] uppercase tracking-wider font-bold text-subtle">{category}</h4>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={staggerContainer}
            className="grid grid-cols-3 max-[809px]:grid-cols-2 gap-4 max-[809px]:gap-[12px]"
          >
            {items.map((tech, idx) => (
              <motion.a
                variants={fadeSlideUp}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 320, damping: 20 }}
                href={tech.link}
                target="_blank"
                rel="noopener noreferrer"
                key={idx}
                className="group relative flex items-center justify-center gap-2 bg-white rounded-[12px] shadow-card border border-transparent hover:border-[#c4c4c4] dark:hover:border-white/20 h-[110px] transition-colors duration-300"
              >
                <img
                  src={dark && (tech.name === 'GitHub' || tech.name === 'Pandas') ? `${tech.icon}/white` : tech.icon}
                  alt={tech.name}
                  loading="lazy"
                  decoding="async"
                  className="w-[28px] h-[28px] rounded-lg object-cover transition-transform duration-300 group-hover:scale-125 group-hover:rotate-6"
                />
                <span className="text-[16px] font-medium text-black group-hover:underline underline-offset-4 decoration-1 transition-all duration-300">{tech.name}</span>
                <span className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:top-[11px] group-hover:right-[11px] text-black">
                  <ArrowIcon className="w-4 h-[18px]" />
                </span>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      ))}
    </motion.div>
  );
}
