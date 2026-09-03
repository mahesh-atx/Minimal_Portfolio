import { motion } from 'framer-motion';
import { wordReveal, wordContainer } from '../animations';

export default function AnimatedWords({ text, className, gradient = false }) {
  const words = text.split(' ');
  return (
    <motion.span variants={wordContainer} className={className}>
      {words.map((word, i) => {
        const isDataScience = word === 'Data' && words[i + 1]?.toLowerCase().startsWith('science');
        if (isDataScience) {
          return (
            <motion.span key={i} variants={wordReveal} className="inline-block mr-[0.28em]">
              <span className="px-1.5 py-[2px] rounded-[6px] bg-gray-200 inline-block">
                {word} {words[i + 1]}
              </span>
            </motion.span>
          );
        }
        if (word.toLowerCase().startsWith('science,')) {
          return null;
        }
        return (
          <motion.span key={i} variants={wordReveal} className={`inline-block mr-[0.28em] ${gradient ? 'animated-gradient' : ''}`}>
            {word}
          </motion.span>
        );
      })}
    </motion.span>
  );
}
