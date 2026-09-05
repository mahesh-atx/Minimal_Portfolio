import { Fragment } from 'react';
import { motion } from 'framer-motion';
import { wordReveal, wordContainer } from '../animations';

export default function AnimatedWords({ text, className, gradient = false }) {
  const words = text.split(' ');
  const tokens = [];

  for (let i = 0; i < words.length; i += 1) {
    const isDataScience = words[i] === 'Data' && words[i + 1]?.toLowerCase().startsWith('science');

    if (isDataScience) {
      tokens.push({ text: `${words[i]} ${words[i + 1]}`, dataScience: true });
      i += 1;
    } else {
      tokens.push({ text: words[i], dataScience: false });
    }
  }

  return (
    <motion.span variants={wordContainer} className={className}>
      {tokens.map((token, i) => (
        <Fragment key={`${token.text}-${i}`}>
          {i > 0 ? ' ' : null}
          <motion.span
            variants={wordReveal}
            className={`inline-block ${gradient ? 'animated-gradient' : ''}`}
          >
            {token.text}
          </motion.span>
        </Fragment>
      ))}
    </motion.span>
  );
}
