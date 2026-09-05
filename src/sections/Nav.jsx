import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { TABS } from '../data';
import { getTabId } from '../utils';

export default function Nav({ activeTab, setActiveTab, onKeyDown, dark, setDark }) {
  return (
    <div className="fixed top-0 left-0 right-0 z-[55] flex justify-center pt-[20px] max-[809px]:pt-[15px] pointer-events-none">
      <motion.nav
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        aria-label="Portfolio sections"
        className="pointer-events-auto w-[90%] max-w-[700px] flex flex-wrap items-center justify-between gap-x-[6px] gap-y-[6px] p-[5px] rounded-full max-[809px]:rounded-[26px] bg-black/[0.04] dark:bg-white/[0.06] border border-black/[0.06] dark:border-white/10"
      >
        {/* Logo — inside the strip, left */}
        <motion.button
          type="button"
          onClick={() => setActiveTab('Ventures')}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          aria-label="Back to Ventures"
          className="order-1 shrink-0 h-[35px] px-[10px] flex items-center text-[16px] font-bold leading-none tracking-[-0.01em] text-black dark:!text-white"
        >
          Md.
        </motion.button>

        <span className="order-2 max-[809px]:hidden w-px h-[16px] bg-black/10 dark:bg-white/15" aria-hidden="true" />

        {/* Tabs — centered in the same strip */}
        <div role="tablist" className="order-3 max-[809px]:basis-full flex-1 min-w-0 flex items-center gap-[4px] max-[809px]:justify-center max-[809px]:flex-wrap max-[809px]:gap-[3px]">
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
                relative flex-1 max-[809px]:flex-none h-[35px] flex items-center justify-center px-3 max-[809px]:px-[12px] rounded-full
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
        </div>

        <span className="order-4 max-[809px]:hidden w-px h-[16px] bg-black/10 dark:bg-white/15" aria-hidden="true" />

        {/* Theme toggle — inside the strip, right */}
        <motion.button
          type="button"
          onClick={() => setDark(!dark)}
          whileHover={{ scale: 1.1, rotate: 20 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          aria-label={`Switch to ${dark ? 'light' : 'dark'} mode`}
          aria-pressed={dark}
          className="order-5 max-[809px]:order-2 shrink-0 w-[35px] h-[35px] rounded-full flex items-center justify-center text-subtle hover:text-black hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
        >
          {dark ? <Sun className="w-[15px] h-[15px]" /> : <Moon className="w-[15px] h-[15px]" />}
        </motion.button>
      </motion.nav>
    </div>
  );
}
