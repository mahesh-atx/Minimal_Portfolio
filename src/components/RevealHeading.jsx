import { motion } from 'framer-motion';
import { wordReveal, wordContainer } from '../animations';

export default function RevealHeading({ children, className = '' }) {
  const words = String(children).split(' ');

  return (
    <motion.span variants={wordContainer} className={`inline-block ${className}`}>
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          variants={wordReveal}
          className="inline-block mr-[0.26em] last:mr-0"
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}
