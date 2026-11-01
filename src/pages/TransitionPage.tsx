import { useEffect } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { HeartBurst } from '../components/HeartBurst'
import { transition as copy } from '../content/site'

const EASE_OUT = [0.22, 1, 0.36, 1] as const

/** The little in-between moment: hearts drift up, a whisper of a message, then on to the letter. */
export function TransitionPage({ onDone }: { onDone: () => void }) {
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const timer = window.setTimeout(onDone, reduceMotion ? 2800 : 4400)
    return () => window.clearTimeout(timer)
  }, [onDone, reduceMotion])

  return (
    <motion.main
      className="relative z-10 flex min-h-dvh items-center justify-center px-6 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.8 }}
    >
      <HeartBurst direction="up" count={26} />

      <p role="status" className="max-w-xl font-display text-[1.6rem] leading-snug font-light text-berry italic sm:text-[2.3rem]">
        <motion.span
          className="block"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1.2, ease: EASE_OUT }}
        >
          {copy.lead}
        </motion.span>
        <motion.span
          className="block"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 1.2, ease: EASE_OUT }}
        >
          {copy.line}{' '}
          <span className="font-hand text-[1.35em] font-semibold whitespace-nowrap text-rose not-italic">
            {copy.highlight}
          </span>
          {copy.trail}
        </motion.span>
      </p>
    </motion.main>
  )
}
