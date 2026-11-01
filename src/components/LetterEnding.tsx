import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { RotateCcw } from 'lucide-react'
import { HeartBurst } from './HeartBurst'
import { HeartButton } from './HeartButton'
import { HugHearts } from './HugHearts'
import { Logo } from './Logo'
import { ending } from '../content/site'

/** The cuddle button, its little reward, and the sign-off underneath the letter. */
export function LetterEnding({ onClose }: { onClose: () => void }) {
  const [cuddles, setCuddles] = useState(0)
  const rewardRef = useRef<HTMLDivElement>(null)

  // Bring the hug into view on small screens, once it has had a moment to grow in.
  useEffect(() => {
    if (cuddles === 0) return
    const timer = window.setTimeout(() => rewardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 350)
    return () => window.clearTimeout(timer)
  }, [cuddles])

  return (
    <section className="mx-auto mt-14 flex max-w-md flex-col items-center text-center">
      <HeartButton
        label={cuddles === 0 ? ending.cuddleButton : ending.cuddleAgain}
        onClick={() => setCuddles((c) => c + 1)}
      />

      <div aria-live="polite" className="w-full">
        <AnimatePresence initial={false}>
          {cuddles > 0 && (
            <motion.div
              key="cuddle"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div ref={rewardRef} className="pt-8">
                <HugHearts key={cuddles} />
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1, duration: 0.9 }}
                  className="mt-4 px-2 font-hand text-[1.9rem] leading-snug font-semibold text-rose sm:text-[2.2rem]"
                >
                  {ending.cuddleMessage}
                </motion.p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {cuddles > 0 && <HeartBurst key={cuddles} direction="down" count={36} />}

      <footer className="mt-16 flex flex-col items-center gap-3 pb-[max(2rem,env(safe-area-inset-bottom))]">
        <p className="font-display text-base text-berry/75 italic">{ending.madeWith}</p>
        <Logo size="sm" />
        <button
          type="button"
          onClick={onClose}
          className="mt-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-berry/70 transition-colors hover:bg-white/60 hover:text-rose"
        >
          <RotateCcw aria-hidden="true" className="size-4" />
          {ending.restart}
        </button>
      </footer>
    </section>
  )
}
