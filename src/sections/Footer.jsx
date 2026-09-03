import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="flex items-center justify-between text-[12px] text-subtle pt-2"
    >
      <span>© {new Date().getFullYear()} Mahesh Dongare</span>
      <span>Built with React &amp; Tailwind</span>
    </motion.footer>
  );
}
