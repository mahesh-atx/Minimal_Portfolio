import { motion } from 'framer-motion';
import ArrowIcon from '../components/ArrowIcon';

const FOOTER_LINKS = [
  { label: 'GitHub', href: 'https://github.com/mahesh-atx' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/mahesh-dongare-117b8a264/' },
  { label: 'Gmail', href: 'mailto:dongaremahesh10@gmail.com' },
];

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="flex items-center justify-between gap-[10px] whitespace-nowrap pt-2 text-[11px] text-subtle"
    >
      <span>© {new Date().getFullYear()} Mahesh Dongare</span>

      <nav aria-label="Footer links" className="flex flex-nowrap items-center gap-[10px]">
        {FOOTER_LINKS.map((link) => {
          const isEmail = link.href.startsWith('mailto:');

          return (
            <a
              key={link.label}
              href={link.href}
              target={isEmail ? undefined : '_blank'}
              rel={isEmail ? undefined : 'noopener noreferrer'}
              className="group inline-flex items-center gap-[4px] whitespace-nowrap transition-colors duration-300 hover:text-[#A3B565]"
            >
              <span aria-hidden="true" className="h-[5px] w-[5px] shrink-0 rounded-full bg-[#A3B565]" />
              <span>{link.label}</span>
              <ArrowIcon className="h-[12px] w-[12px] transition-transform duration-300 group-hover:translate-x-[2px] group-hover:translate-y-[-2px]" />
            </a>
          );
        })}
      </nav>
    </motion.footer>
  );
}
