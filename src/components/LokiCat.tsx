import { useId, type MouseEvent } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { HEART_PATH } from './shapes'
import { loki } from '../content/loki'

export type LokiMood = 'idle' | 'purr' | 'boop' | 'nom'

type Props = {
  mood: LokiMood
  onPet: () => void
  onBoop: () => void
  onChirp: () => void
}

const { colours } = loki
const OUTLINE = '#9AA1AC'

const HEAD_ANIMATION = {
  idle: { rotate: [0, -3, 0, 2.5, 0], x: 0, y: 0, scale: 1 },
  purr: { rotate: 9, x: [0, -1.2, 1.2, -1.2, 1.2, 0], y: 2, scale: 1 },
  boop: { rotate: -4, x: 0, y: -4, scale: 0.96 },
  nom: { rotate: 0, x: 0, y: [0, 3, 0], scale: 1.02 },
}

const HEAD_TRANSITION = {
  idle: { duration: 7, repeat: Infinity, ease: 'easeInOut' },
  purr: { rotate: { type: 'spring', stiffness: 160, damping: 12 }, x: { duration: 0.25, repeat: Infinity }, y: { duration: 0.3 } },
  boop: { type: 'spring', stiffness: 500, damping: 14 },
  nom: { y: { duration: 0.32, repeat: Infinity }, default: { duration: 0.3 } },
} as const

/** Loki, a fluffy silver tabby, drawn in SVG. Tap his head to pet him, his nose to boop it. */
export function LokiCat({ mood, onPet, onBoop, onChirp }: Props) {
  const id = useId()
  const fur = `url(#${id}-fur)`

  const pet = (e: MouseEvent) => {
    e.stopPropagation()
    onPet()
  }
  const boop = (e: MouseEvent) => {
    e.stopPropagation()
    onBoop()
  }

  return (
    <svg viewBox="0 0 260 290" className="w-full overflow-visible" role="img" aria-label="Loki, a fluffy silver and grey tabby cat">
      <defs>
        <linearGradient id={`${id}-fur`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F7F8FA" />
          <stop offset=".55" stopColor={colours.fur} />
          <stop offset="1" stopColor={colours.furShadow} />
        </linearGradient>
        <radialGradient id={`${id}-eye`} cx="50%" cy="40%" r="60%">
          <stop offset="0" stopColor="#E9FBE3" />
          <stop offset=".45" stopColor={colours.eyes} />
          <stop offset="1" stopColor="#4E8F55" />
        </radialGradient>
      </defs>

      {/* Ground shadow */}
      <ellipse cx="130" cy="276" rx="88" ry="9" fill="#DB2777" opacity=".12" />

      <g onClick={onChirp} className="cursor-pointer">
        {/* Tail, banded like a tabby's */}
        <g className="anim-swish">
          <path d="M168 248 C226 252 250 206 232 166 C222 144 238 124 252 132" fill="none" stroke={OUTLINE} strokeWidth="27" strokeLinecap="round" />
          <path d="M168 248 C226 252 250 206 232 166 C222 144 238 124 252 132" fill="none" stroke={colours.fur} strokeWidth="22" strokeLinecap="round" />
          <path d="M168 248 C226 252 250 206 232 166 C222 144 238 124 252 132" fill="none" stroke={colours.stripes} strokeWidth="22" strokeDasharray="9 17" strokeDashoffset="-20" opacity=".55" />
        </g>

        {/* Body */}
        <g className="anim-breathe">
          <path
            d="M130 122C80 122 62 184 66 232c2 30 30 40 64 40s62-10 64-40c4-48-14-110-64-110Z"
            fill={fur}
            stroke={OUTLINE}
            strokeWidth="2.5"
          />
          <path d="M130 150c-22 10-28 50-19 80 6 20 32 20 38 0 9-30 3-70-19-80Z" fill="#F8F9FB" />
          <path d="M116 156l6 8 8-9 8 9 6-8" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <g fill="none" stroke={colours.stripes} strokeWidth="5" strokeLinecap="round" opacity=".6">
            <path d="M74 186c12-4 20 2 24 10" />
            <path d="M70 210c14-4 22 2 26 10" />
            <path d="M72 234c12-3 18 2 22 8" />
            <path d="M186 186c-12-4-20 2-24 10" />
            <path d="M190 210c-14-4-22 2-26 10" />
            <path d="M188 234c-12-3-18 2-22 8" />
          </g>
          {/* Front paws */}
          {[106, 154].map((cx) => (
            <g key={cx}>
              <ellipse cx={cx} cy="266" rx="20" ry="12" fill="#F3F4F6" stroke={OUTLINE} strokeWidth="2.5" />
              <path d={`M${cx - 6} 258v7M${cx + 6} 258v7`} stroke={OUTLINE} strokeWidth="2" strokeLinecap="round" />
            </g>
          ))}
        </g>

        {/* Head */}
        <motion.g
          animate={HEAD_ANIMATION[mood]}
          transition={HEAD_TRANSITION[mood]}
          style={{ originX: '50%', originY: '85%' }}
          onClick={pet}
          className="cursor-pointer"
        >
          {/* Ears */}
          <g>
            <path d="M72 84L64 22c0-7 6-10 11-6l42 38Z" fill={fur} stroke={OUTLINE} strokeWidth="2.5" strokeLinejoin="round" />
            <path d="M77 72l-4-38 30 22Z" fill="#FBCFE8" />
          </g>
          <g className="anim-twitch">
            <path d="M188 84l8-62c0-7-6-10-11-6l-42 38Z" fill={fur} stroke={OUTLINE} strokeWidth="2.5" strokeLinejoin="round" />
            <path d="M183 72l4-38-30 22Z" fill="#FBCFE8" />
          </g>

          <path
            d="M130 42c44 0 74 28 76 62 2 34-30 56-76 56s-78-22-76-56c2-34 32-62 76-62Z"
            fill={fur}
            stroke={OUTLINE}
            strokeWidth="2.5"
          />
          <ellipse cx="108" cy="62" rx="22" ry="9" fill="#fff" opacity=".55" transform="rotate(-14 108 62)" />

          {/* Tabby "M" and cheek stripes */}
          <g fill="none" stroke={colours.stripes} strokeWidth="5" strokeLinecap="round" opacity=".7">
            <path d="M112 50c2 9 4 16 6 22" />
            <path d="M130 46v24" />
            <path d="M148 50c-2 9-4 16-6 22" />
            <path d="M58 98l20 5" />
            <path d="M60 113l18 0" />
            <path d="M202 98l-20 5" />
            <path d="M200 113l-18 0" />
          </g>

          {/* Blush */}
          <ellipse cx="86" cy="128" rx="12" ry="7" fill="#F9A8D4" opacity=".6" />
          <ellipse cx="174" cy="128" rx="12" ry="7" fill="#F9A8D4" opacity=".6" />

          {/* Eyes */}
          {mood === 'purr' || mood === 'nom' ? (
            <g fill="none" stroke="#4B5563" strokeWidth="4.5" strokeLinecap="round">
              <path d="M88 108q14-16 28 0" />
              <path d="M144 108q14-16 28 0" />
            </g>
          ) : mood === 'boop' ? (
            <g fill="none" stroke="#4B5563" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M92 94l16 9-16 9" />
              <path d="M168 94l-16 9 16 9" />
            </g>
          ) : (
            [102, 158].map((cx) => (
              <g key={cx} className="anim-blink">
                <ellipse cx={cx} cy="102" rx="16" ry="18" fill={`url(#${id}-eye)`} stroke="#4B5563" strokeWidth="2" />
                <ellipse cx={cx} cy="104" rx="9" ry="13" fill="#1F2937" />
                <circle cx={cx + 5} cy="95" r="4.5" fill="#fff" />
                <circle cx={cx - 4} cy="110" r="2" fill="#fff" opacity=".85" />
              </g>
            ))
          )}

          {/* Whiskers */}
          <g stroke={OUTLINE} strokeWidth="1.6" strokeLinecap="round" opacity=".9">
            <path d="M84 126L46 118M84 132L44 134M84 138L48 150" />
            <path d="M176 126L214 118M176 132L216 134M176 138L212 150" />
          </g>

          {/* Mouth */}
          {mood === 'nom' ? (
            <g>
              <ellipse cx="130" cy="140" rx="9" ry="8" fill="#BE185D" />
              <ellipse cx="130" cy="144" rx="5.5" ry="3.5" fill="#F9A8D4" />
            </g>
          ) : (
            <path d="M130 128q0 9-9 10M130 128q0 9 9 10" fill="none" stroke="#6B7280" strokeWidth="2.6" strokeLinecap="round" />
          )}

          {/* Nose: its own tap target */}
          <motion.g
            onClick={boop}
            animate={mood === 'boop' ? { scale: [1, 1.5, 1] } : { scale: 1 }}
            transition={{ duration: 0.4 }}
            style={{ originX: '50%', originY: '50%' }}
            className="cursor-pointer"
          >
            <circle cx="130" cy="122" r="15" fill="transparent" />
            <path d="M121 118q9-6 18 0-4 9-9 10-5-1-9-10Z" fill="#F9A8D4" stroke="#EC4899" strokeWidth="1.2" />
            <ellipse cx="127" cy="118.5" rx="2.6" ry="1.4" fill="#fff" opacity=".7" />
          </motion.g>
        </motion.g>

        {/* Collar with a heart tag */}
        <path d="M86 150q44 26 88 0" fill="none" stroke={colours.collar} strokeWidth="9" strokeLinecap="round" />
        <path d="M86 150q44 26 88 0" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" opacity=".35" />
        <g transform="translate(120 160) scale(.85)">
          <path d={HEART_PATH} fill="#DB2777" />
          <ellipse cx="8" cy="8" rx="2.4" ry="1.6" fill="#fff" opacity=".55" />
        </g>
      </g>

      {/* Treat flying in */}
      <AnimatePresence>
        {mood === 'nom' && (
          <motion.g
            key="treat"
            initial={{ x: 90, y: 90, rotate: 40, opacity: 0 }}
            animate={{ x: 0, y: 0, rotate: 0, opacity: [0, 1, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <g transform="translate(118 136)">
              <path d="M2 6c4-6 12-6 16 0-4 6-12 6-16 0Z" fill="#FDBA74" stroke="#EA580C" strokeWidth="1.2" />
              <path d="M18 6l6-5v10Z" fill="#FDBA74" stroke="#EA580C" strokeWidth="1.2" strokeLinejoin="round" />
              <circle cx="6" cy="5" r="1.2" fill="#7C2D12" />
            </g>
          </motion.g>
        )}
      </AnimatePresence>
    </svg>
  )
}
