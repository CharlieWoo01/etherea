import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowLeft, Fish, Hand, RotateCcw, Sparkle } from 'lucide-react'
import { HeartBurst } from '../components/HeartBurst'
import { LokiCat, type LokiMood } from '../components/LokiCat'
import { HeartShape, PawShape } from '../components/shapes'
import { loki } from '../content/loki'

const EASE_OUT = [0.22, 1, 0.36, 1] as const
const MAX_LOVE = 5

type Reaction = keyof typeof loki.reactions

const MOOD_FOR: Record<Reaction, LokiMood> = { pet: 'purr', boop: 'boop', treat: 'nom' }
const MOOD_DURATION: Record<Reaction, number> = { pet: 2200, boop: 1100, treat: 2000 }

const ACTIONS: { kind: Reaction; Icon: typeof Hand }[] = [
  { kind: 'pet', Icon: Hand },
  { kind: 'boop', Icon: Sparkle },
  { kind: 'treat', Icon: Fish },
]

// Little paw prints wandering across the page.
const TRAIL = [
  { top: '6%', left: '8%', r: 20 },
  { top: '11%', left: '15%', r: 30 },
  { top: '38%', left: '86%', r: -150 },
  { top: '44%', left: '80%', r: -140 },
  { top: '72%', left: '6%', r: 10 },
  { top: '78%', left: '13%', r: 25 },
  { top: '92%', left: '84%', r: -20 },
]

const PURR_HEARTS = [
  { x: -46, colour: '#F472B6', size: 16, delay: 0 },
  { x: 40, colour: '#9CA3AF', size: 14, delay: 0.15 },
  { x: -10, colour: '#DB2777', size: 20, delay: 0.3 },
  { x: 62, colour: '#F9A8D4', size: 12, delay: 0.45 },
]

type Props = {
  onBackToLetter: () => void
  onRestart: () => void
}

export function LokiPage({ onBackToLetter, onRestart }: Props) {
  const [mood, setMood] = useState<LokiMood>('idle')
  const [message, setMessage] = useState({ text: loki.chirps[0], key: 0 })
  const [counts, setCounts] = useState({ pet: 0, boop: 0, treat: 0, chirp: 1 })
  const [love, setLove] = useState(0)
  const [purrs, setPurrs] = useState(0)
  const moodTimer = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(moodTimer.current), [])

  const say = (text: string) => setMessage((m) => ({ text, key: m.key + 1 }))

  const react = (kind: Reaction) => {
    const lines = loki.reactions[kind]
    say(lines[counts[kind] % lines.length])
    setCounts((c) => ({ ...c, [kind]: c[kind] + 1 }))
    setMood(MOOD_FOR[kind])
    setLove((l) => Math.min(MAX_LOVE, l + 1))
    if (kind === 'pet') setPurrs((p) => p + 1)

    window.clearTimeout(moodTimer.current)
    moodTimer.current = window.setTimeout(() => setMood('idle'), MOOD_DURATION[kind])
  }

  const chirp = () => {
    if (mood !== 'idle') return
    say(loki.chirps[counts.chirp % loki.chirps.length])
    setCounts((c) => ({ ...c, chirp: c.chirp + 1 }))
  }

  const approved = love >= MAX_LOVE

  return (
    <motion.main
      className="relative z-10 flex min-h-dvh flex-col items-center overflow-x-clip px-4 pt-[max(2.5rem,env(safe-area-inset-top))] pb-[max(2rem,env(safe-area-inset-bottom))] sm:px-6 sm:pt-14"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        {TRAIL.map((p, i) => (
          <motion.span
            key={i}
            className="absolute block text-[#9CA3AF]"
            style={{ top: p.top, left: p.left, rotate: p.r }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 0.22, scale: 1 }}
            transition={{ delay: 0.6 + i * 0.25, duration: 0.5 }}
          >
            <PawShape className="size-7 sm:size-9" />
          </motion.span>
        ))}
      </div>

      <motion.header
        className="relative text-center"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 1, ease: EASE_OUT }}
      >
        <p className="glass mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[0.7rem] font-semibold tracking-[0.24em] text-berry/70 uppercase">
          <PawShape className="size-3.5 text-candy" />
          {loki.eyebrow}
          <PawShape className="size-3.5 text-candy" />
        </p>
        <h1 className="font-hand text-[3.2rem] leading-none font-bold text-rose sm:text-[4rem]">{loki.title}</h1>
        <p className="mt-2 font-display text-[1.05rem] text-berry/80 italic sm:text-lg">{loki.subtitle}</p>
      </motion.header>

      {/* Loki's stage */}
      <motion.section
        className="relative mt-4 w-full max-w-sm"
        initial={{ opacity: 0, y: 30, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.9, ease: EASE_OUT }}
      >
        {/* Speech bubble: fixed height so Loki never jumps around */}
        <div className="flex h-[4.5rem] items-end justify-center" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.p
              key={message.key}
              className="relative max-w-[17rem] rounded-[22px] border border-white/90 bg-white/80 px-5 py-2.5 text-center font-hand text-[1.45rem] leading-tight font-semibold text-berry shadow-[0_10px_24px_-12px_rgba(219,39,119,0.45)]"
              initial={{ opacity: 0, y: 8, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 380, damping: 22 }}
            >
              {message.text}
              <span className="absolute -bottom-[7px] left-1/2 size-3.5 -translate-x-1/2 rotate-45 border-r border-b border-white/90 bg-white/80" />
            </motion.p>
          </AnimatePresence>
        </div>

        <div className="relative mx-auto mt-2 w-[min(72vw,300px,calc((100dvh-24rem)*0.85))] min-w-[200px]">
          <LokiCat mood={mood} onPet={() => react('pet')} onBoop={() => react('boop')} onChirp={chirp} />

          {/* Hearts drifting up while he purrs */}
          {purrs > 0 &&
            PURR_HEARTS.map((h, i) => (
              <motion.span
                key={`${purrs}-${i}`}
                aria-hidden="true"
                className="pointer-events-none absolute top-[18%] left-1/2 block"
                style={{ color: h.colour }}
                initial={{ x: h.x, y: 0, opacity: 0, scale: 0.4 }}
                animate={{ y: -90, opacity: [0, 1, 0], scale: 1 }}
                transition={{ duration: 1.6, delay: h.delay, ease: 'easeOut' }}
              >
                <HeartShape style={{ width: h.size, height: h.size }} />
              </motion.span>
            ))}
        </div>
      </motion.section>

      <motion.div
        className="mt-6 flex flex-wrap justify-center gap-2.5"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.8, ease: EASE_OUT }}
      >
        {ACTIONS.map(({ kind, Icon }) => (
          <motion.button
            key={kind}
            type="button"
            onClick={() => react(kind)}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 420, damping: 16 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-[linear-gradient(135deg,#FFFFFF_0%,#FDE1EE_55%,#FBCFE8_100%)] py-2 pr-4 pl-2 text-[0.95rem] font-bold text-berry shadow-[0_10px_22px_-12px_rgba(219,39,119,0.55),inset_0_1px_0_#fff]"
          >
            <span className="grid size-8 place-items-center rounded-full bg-[linear-gradient(135deg,#F472B6,#DB2777)] text-white">
              <Icon aria-hidden="true" className="size-4" strokeWidth={2.4} />
            </span>
            {loki.actions[kind]}
          </motion.button>
        ))}
      </motion.div>

      {/* Approval meter */}
      <motion.div
        className="glass mt-7 w-full max-w-sm rounded-[24px] px-5 py-4 text-center"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.8, ease: EASE_OUT }}
      >
        <p className="text-xs font-bold tracking-[0.2em] text-berry/70 uppercase">{loki.meterLabel}</p>
        <div
          className="mt-2.5 flex justify-center gap-2"
          role="meter"
          aria-label={loki.meterLabel}
          aria-valuemin={0}
          aria-valuemax={MAX_LOVE}
          aria-valuenow={love}
        >
          {Array.from({ length: MAX_LOVE }, (_, i) => (
            <motion.span
              key={i}
              animate={i < love ? { scale: [1, 1.35, 1] } : { scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <HeartShape className={`size-7 transition-colors duration-300 ${i < love ? 'text-rose' : 'text-petal'}`} />
            </motion.span>
          ))}
        </div>
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={approved ? 'approved' : 'hint'}
            className={approved ? 'mt-2 font-hand text-[1.6rem] leading-tight font-semibold text-rose' : 'mt-2 text-sm text-berry/60'}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {approved ? loki.approved : loki.meterHint}
          </motion.p>
        </AnimatePresence>
      </motion.div>
      {approved && <HeartBurst direction="down" count={40} paws />}

      {/* A note from Loki */}
      <motion.article
        className="paper relative mt-12 w-full max-w-md -rotate-1 rounded-[22px] px-6 pt-9 pb-8 shadow-[0_24px_50px_-26px_rgba(131,24,67,0.45)] sm:px-9"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '0px 0px -10% 0px' }}
        transition={{ duration: 0.9, ease: EASE_OUT }}
      >
        <span
          aria-hidden="true"
          className="absolute -top-3 left-1/2 h-6 w-24 -translate-x-1/2 rotate-2 rounded-sm bg-petal/80 shadow-sm"
        />
        <h2 className="text-center text-xs font-bold tracking-[0.22em] text-berry/60 uppercase">{loki.note.title}</h2>
        <p className="mt-4 font-hand text-[2rem] leading-none font-semibold text-rose">{loki.note.greeting}</p>
        <div className="mt-4 space-y-4 font-display text-[1.02rem] leading-[1.8] text-berry">
          {loki.note.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <div className="mt-6 flex items-end justify-end gap-3">
          <div className="text-right">
            <p className="font-display text-berry/80 italic">{loki.note.signOff}</p>
            <p className="-rotate-3 font-hand text-[2.6rem] leading-none font-bold text-rose">{loki.note.signature}</p>
          </div>
          <PawShape className="mb-1 size-10 -rotate-12 text-[#9CA3AF]" />
        </div>
        <p className="mt-6 font-hand text-xl leading-snug text-berry/70">{loki.note.postscript}</p>
      </motion.article>

      <nav className="mt-12 flex flex-wrap items-center justify-center gap-2">
        <button
          type="button"
          onClick={onBackToLetter}
          className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-berry/70 transition-colors hover:bg-white/60 hover:text-rose"
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          {loki.backToLetter}
        </button>
        <button
          type="button"
          onClick={onRestart}
          className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-berry/70 transition-colors hover:bg-white/60 hover:text-rose"
        >
          <RotateCcw aria-hidden="true" className="size-4" />
          {loki.restart}
        </button>
      </nav>
    </motion.main>
  )
}
