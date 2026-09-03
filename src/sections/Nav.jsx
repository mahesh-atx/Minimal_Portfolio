import { motion } from 'framer-motion';
import { TABS } from '../data';
import { getTabId } from '../utils';

export default function Nav({ activeTab, setActiveTab, onKeyDown }) {
  return (
    <motion.nav
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      role="tablist"
      aria-label="Portfolio sections"
      className="-mt-[45px] max-[809px]:-mt-[30px] flex items-center gap-[4px] max-[809px]:flex-wrap max-[809px]:justify-center max-[809px]:gap-[3px] w-full p-[5px] rounded-full bg-black/[0.04] dark:bg-white/[0.06] border border-black/[0.06] dark:border-white/10"
    >
      {TABS.map((tab) => (
        <button
          key={tab}
          id={`tab-${getTabId(tab)}`}
          type="button"
          role="tab"
          aria-selected={activeTab === tab}
          aria-controls={`panel-${getTabId(tab)}`}
          tabIndex={activeTab === tab ? 0 : -1}
          onClick={() => setActiveTab(tab)}
          onKeyDown={onKeyDown}
          className={`
            relative flex-1 max-[809px]:flex-none px-3 max-[809px]:px-[12px] py-[7px] max-[809px]:py-[6px] rounded-full
            text-[14px] max-[809px]:text-[13px] font-medium transition-colors duration-300 text-center whitespace-nowrap
            ${activeTab === tab ? 'text-white dark:!text-black' : 'text-subtle hover:text-black hover:bg-black/5 dark:hover:bg-white/10'}
          `}
        >
          {activeTab === tab && (
            <motion.span
              layoutId="tab-pill"
              className="absolute inset-0 bg-black dark:!bg-white rounded-full"
              transition={{ type: 'spring', stiffness: 420, damping: 32 }}
            />
          )}
          <span className="relative z-10">
            {tab === 'Tech Stack' ? (
              <>
                <span className="max-[809px]:hidden">Tech Stack</span>
                <span className="hidden max-[809px]:inline">Stack</span>
              </>
            ) : tab}
          </span>
        </button>
      ))}
    </motion.nav>
  );
}
