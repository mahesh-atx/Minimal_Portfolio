import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { TABS } from '../data';
import { getTabId } from '../utils';

export default function Nav({ activeTab, setActiveTab, onKeyDown, dark, setDark }) {
  return (
    <div className="fixed top-0 left-0 right-0 z-[55] flex justify-center px-[20px] pt-[20px] max-[809px]:pt-[15px] pointer-events-none">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-auto w-[700px] max-[809px]:w-full flex flex-wrap items-center justify-between gap-x-[14px] gap-y-[10px]"
      >
        {/* Logo monogram — left */}
        <motion.button
          type="button"
          onClick={() => setActiveTab('Ventures')}
          whileHover={{ scale: 1.07, rotate: -3 }}
          whileTap={{ scale: 0.94 }}
          transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          aria-label="Back to Ventures"
          className="order-1 font-serif-accent text-[19px] leading-none text-black dark:!text-white py-[7px]"
        >
          Md.
        </motion.button>

        {/* Tabs — same pill design, centered */}
        <motion.nav
          role="tablist"
          aria-label="Portfolio sections"
          className="order-2 max-[809px]:order-3 max-[809px]:basis-full flex-1 min-w-0 flex items-center justify-center gap-[4px] max-[809px]:gap-[3px] max-[809px]:flex-wrap p-[5px] rounded-full bg-black/[0.04] dark:bg-white/[0.06] border border-black/[0.06] dark:border-white/10"
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

        {/* Theme toggle — right */}
        <motion.button
          type="button"
          onClick={() => setDark(!dark)}
          whileHover={{ scale: 1.12, rotate: 20 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          aria-label={`Switch to ${dark ? 'light' : 'dark'} mode`}
          aria-pressed={dark}
          className="order-3 max-[809px]:order-2 shrink-0 flex items-center justify-center w-[36px] h-[36px] rounded-full bg-black/[0.04] dark:bg-white/[0.06] border border-black/[0.06] dark:border-white/10 text-black dark:!text-white"
        >
          {dark ? <Sun className="w-[15px] h-[15px]" /> : <Moon className="w-[15px] h-[15px]" />}
        </motion.button>
      </motion.div>
    </div>
  );
}
