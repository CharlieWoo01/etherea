import { motion } from 'motion/react'
import { GlowButton } from '../components/GlowButton'
import { Logo } from '../components/Logo'
import { HeartShape, SparkleShape } from '../components/shapes'
import { landing } from '../content/site'

const EASE_OUT = [0.22, 1, 0.36, 1] as const

/** Each line arrives a beat after the last, to let the curiosity build. */
const appear = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 1.1, ease: EASE_OUT },
})

export function LandingPage({ onBegin }: { onBegin: () => void }) {
  return (
    <motion.main
      className="relative z-10 flex min-h-dvh flex-col items-center justify-center px-5 pt-[max(3.5rem,env(safe-area-inset-top))] pb-[max(3.5rem,env(safe-area-inset-bottom))] text-center"
      exit={{ opacity: 0, scale: 0.97, filter: 'blur(6px)' }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
    >
      <motion.p
        {...appear(0.2)}
        className="glass mb-8 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[0.7rem] font-semibold tracking-[0.28em] text-berry/70 uppercase"
      >
        <SparkleShape className="size-3 text-candy" />
        {landing.eyebrow}
        <SparkleShape className="size-3 text-candy" />
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 20, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.5, duration: 1.4, ease: EASE_OUT }}
      >
        <Logo size="xl" />
      </motion.h1>

      <motion.p
        {...appear(1.2)}
        className="mt-5 font-display text-[1.05rem] font-light tracking-wide text-berry/80 italic sm:text-xl"
      >
        {landing.tagline}
      </motion.p>

      <motion.div {...appear(1.6)} aria-hidden="true" className="my-8 flex items-center gap-3">
        <span className="h-px w-12 bg-linear-to-r from-transparent to-candy/60" />
        <HeartShape className="size-3.5 text-candy" />
        <span className="h-px w-12 bg-linear-to-l from-transparent to-candy/60" />
      </motion.div>

      <motion.div {...appear(2.1)} className="glass w-full max-w-md rounded-[28px] px-6 py-7 sm:px-9 sm:py-8">
        <p className="font-display text-[1.15rem] leading-relaxed text-berry sm:text-[1.3rem]">{landing.mystery}</p>
        <motion.p
          {...appear(3.2)}
          className="mt-4 font-hand text-[1.75rem] leading-tight font-semibold text-balance text-rose sm:text-[2rem]"
        >
          {landing.found}
        </motion.p>
      </motion.div>

      <motion.div {...appear(4)} className="mt-12">
        <GlowButton onClick={onBegin}>{landing.cta}</GlowButton>
      </motion.div>
    </motion.main>
  )
}
