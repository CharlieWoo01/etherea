import { useEffect, useId, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { Bow, HeartShape, SparkleShape, WaxSeal } from './shapes'

type Phase = 'idle' | 'seal' | 'flap' | 'rise'

/** How long each step lingers (ms) before moving on to the next. */
const TIMINGS: Record<Exclude<Phase, 'idle'>, number> = { seal: 700, flap: 850, rise: 1500 }
const REDUCED_TIMINGS: Record<Exclude<Phase, 'idle'>, number> = { seal: 150, flap: 250, rise: 700 }

const EASE_OUT = [0.22, 1, 0.36, 1] as const

// Flap outline with softened top corners so it sits neatly on the rounded envelope.
const FLAP_FRONT = 'polygon(0 13%, 1.6% 4.5%, 6% 0, 94% 0, 98.4% 4.5%, 100% 13%, 50% 100%)'
const FLAP_BACK = 'polygon(0 87%, 1.6% 95.5%, 6% 100%, 94% 100%, 98.4% 95.5%, 100% 87%, 50% 0)'

const TWINKLES = [
  { top: '30%', left: '-4%', size: 18, delay: 0 },
  { top: '8%', left: '88%', size: 14, delay: 0.8 },
  { top: '92%', left: '96%', size: 20, delay: 1.6 },
  { top: '42%', left: '102%', size: 10, delay: 2.2 },
  { top: '100%', left: '20%', size: 12, delay: 1.1 },
]

type Props = {
  label: string
  ariaLabel: string
  onOpened: () => void
}

/**
 * A pastel envelope built from layered CSS + SVG. Clicking it runs:
 * seal pulse → flap swings open → folded letter rises out → onOpened().
 */
export function Envelope({ label, ariaLabel, onOpened }: Props) {
  const reduceMotion = useReducedMotion()
  const [phase, setPhase] = useState<Phase>('idle')
  const id = useId()

  useEffect(() => {
    if (phase === 'idle') return
    const delay = (reduceMotion ? REDUCED_TIMINGS : TIMINGS)[phase]
    const timer = window.setTimeout(() => {
      if (phase === 'seal') setPhase('flap')
      else if (phase === 'flap') setPhase('rise')
      else onOpened()
    }, delay)
    return () => window.clearTimeout(timer)
  }, [phase, reduceMotion, onOpened])

  const isIdle = phase === 'idle'
  const flapOpen = phase === 'flap' || phase === 'rise'

  return (
    // Width is capped by viewport height too, so the whole scene fits on screen without scrolling.
    <div className="relative mx-auto w-[min(84vw,380px,calc((100dvh-22rem)*0.95))] min-w-[200px]">
      {/* Headroom for the open flap and rising letter, so nothing shifts while it opens. */}
      <div aria-hidden="true" className="aspect-[100/38]" />

      {TWINKLES.map((t) => (
        <SparkleShape
          key={`${t.top}-${t.left}`}
          className="anim-twinkle absolute text-candy drop-shadow-[0_0_6px_rgba(255,255,255,0.9)]"
          style={{ top: t.top, left: t.left, width: t.size, height: t.size, animationDelay: `${t.delay}s` }}
        />
      ))}

      <motion.div
        animate={isIdle ? { y: [0, -8, 0], rotate: [0, -0.6, 0] } : { y: 0, rotate: 0 }}
        transition={isIdle ? { duration: 3.8, repeat: Infinity, ease: 'easeInOut' } : { duration: 0.4 }}
      >
        <motion.button
          type="button"
          aria-label={ariaLabel}
          aria-disabled={!isIdle}
          onClick={() => isIdle && setPhase('seal')}
          whileHover={isIdle ? { scale: 1.03, rotate: -1.2 } : undefined}
          whileTap={isIdle ? { scale: 0.97 } : undefined}
          transition={{ type: 'spring', stiffness: 300, damping: 18 }}
          className="relative block aspect-[3/2] w-full rounded-[22px] [perspective:1100px] aria-disabled:cursor-default"
        >
          {/* Soft ground shadow */}
          <span className="absolute -bottom-7 left-[10%] h-8 w-[80%] rounded-[50%] bg-rose/25 blur-xl" />

          {/* Back / inside of the envelope */}
          <span className="absolute inset-0 rounded-[22px] bg-[linear-gradient(180deg,#F49AC6_0%,#F7B3D4_55%,#FAC4DE_100%)] shadow-[0_26px_50px_-20px_rgba(219,39,119,0.6)]" />

          {/* The folded letter tucked inside */}
          <motion.span
            className="paper absolute inset-x-[7%] top-[5%] z-10 h-[84%] rounded-xl shadow-[0_6px_16px_-6px_rgba(131,24,67,0.35)]"
            initial={false}
            animate={{ y: phase === 'rise' ? '-60%' : '0%' }}
            transition={{ duration: reduceMotion ? 0 : 1.15, ease: EASE_OUT }}
          >
            <span className="absolute inset-x-0 top-1/2 h-px bg-linear-to-r from-transparent via-[#E8C9D6] to-transparent" />
            <span className="absolute inset-x-[14%] top-[16%] flex flex-col gap-[9%]">
              <span className="font-hand text-[clamp(1rem,5vw,1.5rem)] leading-none text-rose">for you ♡</span>
              <span className="h-[3px] w-full rounded-full bg-petal/70" />
              <span className="h-[3px] w-4/5 rounded-full bg-petal/70" />
            </span>
            <HeartShape className="absolute right-[12%] bottom-[14%] size-[12%] text-candy/70" />
          </motion.span>

          {/* Front pocket */}
          <span className="absolute inset-0 z-20 overflow-hidden rounded-[22px]">
            <svg viewBox="0 0 300 200" preserveAspectRatio="none" className="size-full" aria-hidden="true">
              <defs>
                <linearGradient id={`${id}-l`} x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stopColor="#FCD5E8" />
                  <stop offset="1" stopColor="#F9BAD9" />
                </linearGradient>
                <linearGradient id={`${id}-r`} x1="1" y1="0" x2="0" y2="0">
                  <stop offset="0" stopColor="#FCD5E8" />
                  <stop offset="1" stopColor="#F9BAD9" />
                </linearGradient>
                <linearGradient id={`${id}-b`} x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0" stopColor="#FDE1EE" />
                  <stop offset="1" stopColor="#FBCFE8" />
                </linearGradient>
              </defs>
              <path d="M0 0 L150 116 L0 200Z" fill={`url(#${id}-l)`} />
              <path d="M300 0 L150 116 L300 200Z" fill={`url(#${id}-r)`} />
              <path d="M0 200 L150 98 L300 200Z" fill={`url(#${id}-b)`} />
              <path d="M2 198 L150 98 L298 198" fill="none" stroke="#fff" strokeOpacity=".7" strokeWidth="1.2" />
              <path d="M0 128 L72 200 L52 200 L0 148Z" fill="#F472B6" fillOpacity=".85" />
              <path d="M0 128 L72 200" stroke="#fff" strokeOpacity=".5" strokeWidth="1" />
            </svg>
            <span className="absolute bottom-[13%] left-1/2 -translate-x-1/2 -rotate-3 rounded-md bg-cream/90 px-4 pt-0.5 pb-1 font-hand text-[clamp(1.35rem,6vw,1.9rem)] leading-tight whitespace-nowrap text-rose shadow-[0_3px_10px_-4px_rgba(219,39,119,0.45)]">
              {label}
            </span>
          </span>

          <Bow className="absolute -bottom-[7%] -left-[5%] z-40 w-[27%] -rotate-[28deg] drop-shadow-[0_4px_6px_rgba(219,39,119,0.3)]" />

          {/* Shadow the closed flap casts on the pocket */}
          <motion.span
            className="absolute inset-x-0 top-[1.5%] z-[25] h-[57%] blur-[4px]"
            animate={{ opacity: flapOpen ? 0 : 1 }}
            transition={{ duration: 0.3 }}
          >
            <span className="absolute inset-0 bg-rose/25" style={{ clipPath: FLAP_FRONT }} />
          </motion.span>

          {/* The flap: two faces so it shows its inside once it swings open */}
          <motion.span
            className="absolute inset-x-0 top-0 h-[56%]"
            style={{ transformOrigin: '50% 0%', transformStyle: 'preserve-3d', zIndex: phase === 'rise' ? 5 : 30 }}
            initial={false}
            animate={{ rotateX: flapOpen ? 180 : 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.8, ease: [0.65, 0, 0.35, 1] }}
          >
            <span
              className="absolute inset-0 bg-[linear-gradient(180deg,#FDE1EE_0%,#FBCFE8_45%,#F9B4D6_100%)] [backface-visibility:hidden]"
              style={{ clipPath: FLAP_FRONT }}
            />
            <span
              className="absolute inset-0 bg-[linear-gradient(0deg,#F7AED0_0%,#F59BC5_100%)] [backface-visibility:hidden]"
              style={{ clipPath: FLAP_BACK, transform: 'rotateX(180deg)' }}
            />
            <motion.span
              className="absolute top-full left-1/2 block w-[19%] [backface-visibility:hidden]"
              style={{ x: '-50%', y: '-64%' }}
              animate={phase === 'seal' ? { scale: [1, 1.2, 0.94, 1.1, 1] } : { scale: 1 }}
              transition={{ duration: 0.7, ease: 'easeInOut' }}
            >
              <WaxSeal className="w-full drop-shadow-[0_4px_6px_rgba(131,24,67,0.35)]" />
            </motion.span>
          </motion.span>
        </motion.button>
      </motion.div>
    </div>
  )
}
