import { useEffect, useMemo, useRef, type ReactNode } from 'react'
import { motion, useInView } from 'motion/react'
import { CornerFlourish, HeartShape, SparkleShape, WaxSeal, type CSSVars } from './shapes'
import type { letter as LetterContent } from '../content/letter'

const EASE_OUT = [0.22, 1, 0.36, 1] as const

// A word followed by its emoji run, so emoji never wrap onto a line by themselves.
const EMOJI_RUN = /(\S+ \p{Extended_Pictographic}[\p{Extended_Pictographic}‍️]*)/u

function withEmoji(text: string, keyPrefix: string): ReactNode[] {
  return text.split(EMOJI_RUN).map((part, i) =>
    i % 2 === 1 ? (
      <span key={`${keyPrefix}-${i}`} className="whitespace-nowrap">
        {part}
      </span>
    ) : (
      part
    ),
  )
}

/** Turns `*words*` into a little handwritten highlight. */
function withEmphasis(text: string): ReactNode[] {
  return text.split(/\*(.+?)\*/g).map((part, i) =>
    i % 2 === 1 ? (
      <em key={i} className="highlight font-hand text-[1.3em] leading-none font-semibold text-rose not-italic">
        {part}
      </em>
    ) : (
      withEmoji(part, String(i))
    ),
  )
}

type RevealProps = {
  children: ReactNode
  className?: string
  /** Position in the reading order, used to stagger whatever is visible on arrival. */
  order: number
  mountedAt: number
}

/**
 * Fades text in as it scrolls into view. Lines already on screen when the
 * letter unfolds follow a gentle stagger; lines further down appear promptly
 * once scrolled to.
 */
function Reveal({ children, className, order, mountedAt }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -8% 0px' })
  const delay = useMemo(() => {
    if (!inView) return 0
    const scheduled = 0.75 + order * 0.2
    const elapsed = (performance.now() - mountedAt) / 1000
    return Math.max(0.05, scheduled - elapsed)
  }, [inView, order, mountedAt])

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 14 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.9, delay, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  )
}

const FLOATERS = [
  { top: '-14px', left: '8%', size: 22, kind: 'heart', colour: '#F472B6', r: '-12deg' },
  { top: '6%', left: '-10px', size: 14, kind: 'sparkle', colour: '#F9A8D4', r: '0deg' },
  { top: '-10px', left: '78%', size: 16, kind: 'sparkle', colour: '#DB2777', r: '0deg' },
  { top: '22%', left: 'calc(100% - 8px)', size: 18, kind: 'heart', colour: '#F9A8D4', r: '14deg' },
  { top: '48%', left: '-12px', size: 16, kind: 'heart', colour: '#E9D5FF', r: '-10deg' },
  { top: '64%', left: 'calc(100% - 10px)', size: 13, kind: 'sparkle', colour: '#F472B6', r: '0deg' },
  { top: '86%', left: '-8px', size: 12, kind: 'sparkle', colour: '#DB2777', r: '0deg' },
  { top: 'calc(100% - 10px)', left: '88%', size: 22, kind: 'heart', colour: '#F472B6', r: '10deg' },
] as const

type Props = {
  content: typeof LetterContent
}

/** The unfolded letter: cream paper, floral corners, handwritten greeting and signature. */
export function LetterPaper({ content }: Props) {
  const articleRef = useRef<HTMLElement>(null)
  const mountedAt = useMemo(() => performance.now(), [])

  // Move focus to the letter so keyboard and screen-reader users land on it.
  useEffect(() => {
    articleRef.current?.focus({ preventScroll: true })
  }, [])

  let order = 0

  return (
    <div className="relative mx-auto w-full max-w-[660px]">
      {FLOATERS.map((f, i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          className="absolute z-10 block"
          style={{ top: f.top, left: f.left, color: f.colour }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9 + i * 0.09, type: 'spring', stiffness: 260, damping: 14 }}
        >
          <span className="anim-bob block" style={{ '--dur': `${3.4 + (i % 3) * 0.7}s`, '--r': f.r } as CSSVars}>
            {f.kind === 'heart' ? (
              <HeartShape style={{ width: f.size, height: f.size }} className="drop-shadow-[0_2px_4px_rgba(219,39,119,0.3)]" />
            ) : (
              <SparkleShape style={{ width: f.size, height: f.size }} />
            )}
          </span>
        </motion.span>
      ))}

      <motion.article
        ref={articleRef}
        tabIndex={-1}
        aria-label="Your letter"
        className="paper relative rounded-[26px] px-6 pt-16 pb-14 shadow-[0_30px_70px_-30px_rgba(131,24,67,0.45),0_2px_0_rgba(255,255,255,0.9)_inset] outline-none sm:px-14 sm:pt-20 sm:pb-16"
        initial={{ opacity: 0, y: 36, clipPath: 'inset(0% 0% 88% 0% round 26px)' }}
        animate={{ opacity: 1, y: 0, clipPath: 'inset(-10% -20% -10% -20% round 26px)' }}
        transition={{ duration: 1.4, ease: EASE_OUT, opacity: { duration: 0.5 } }}
      >
        {/* Fold creases that soften as the paper settles */}
        {['33.3%', '66.6%'].map((top, i) => (
          <motion.span
            key={top}
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 h-6 -translate-y-1/2 bg-[linear-gradient(180deg,transparent,rgba(219,39,119,0.07)_48%,rgba(255,255,255,0.8)_52%,transparent)]"
            style={{ top }}
            initial={{ opacity: 1 }}
            animate={{ opacity: 0.35 }}
            transition={{ delay: 0.8 + i * 0.2, duration: 1.6 }}
          />
        ))}

        <CornerFlourish className="pointer-events-none absolute top-2 left-2 size-16 sm:size-24" />
        <CornerFlourish className="pointer-events-none absolute top-2 right-2 size-16 -scale-x-100 sm:size-24" />
        <CornerFlourish className="pointer-events-none absolute bottom-2 left-2 size-16 -scale-y-100 sm:size-24" />
        <CornerFlourish className="pointer-events-none absolute right-2 bottom-2 size-16 -scale-100 sm:size-24" />

        <WaxSeal className="absolute top-3 left-1/2 w-9 -translate-x-1/2 opacity-90 sm:top-5 sm:w-11" />

        <div className="relative">
          <Reveal order={order++} mountedAt={mountedAt}>
            <h2 className="font-hand text-[2.35rem] leading-[1.1] font-semibold text-rose sm:text-[3.2rem]">
              {withEmoji(content.greeting, 'greeting')}
            </h2>
          </Reveal>

          <div className="mt-7 space-y-6 font-display text-[1.07rem] leading-[1.85] text-berry sm:mt-9 sm:space-y-7 sm:text-[1.16rem]">
            {content.paragraphs.map((paragraph, i) => (
              <Reveal key={i} order={order++} mountedAt={mountedAt}>
                <p>{withEmphasis(paragraph)}</p>
              </Reveal>
            ))}
          </div>

          <Reveal order={order++} mountedAt={mountedAt} className="mt-9 sm:mt-11">
            <p className="font-hand text-[2rem] leading-tight font-semibold text-rose sm:text-[2.4rem]">
              {withEmphasis(content.closing)}
            </p>
          </Reveal>

          <Reveal order={order++} mountedAt={mountedAt} className="mt-10 text-right">
            <p className="font-display text-lg text-berry/80 italic">{content.signOff}</p>
            <p className="mt-1 inline-block -rotate-3 font-hand text-[3.2rem] leading-none font-bold text-rose sm:text-[3.8rem]">
              {content.signature}
            </p>
          </Reveal>
        </div>
      </motion.article>
    </div>
  )
}
