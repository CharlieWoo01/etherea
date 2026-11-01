import { motion } from 'motion/react'
import { HeartShape } from './shapes'

const POPS = [
  { x: -26, y: -46, size: 12, delay: 1.0 },
  { x: 0, y: -60, size: 16, delay: 1.1 },
  { x: 26, y: -46, size: 12, delay: 1.2 },
  { x: -12, y: -72, size: 9, delay: 1.35 },
  { x: 14, y: -76, size: 10, delay: 1.45 },
]

const SPRING = { type: 'spring', stiffness: 110, damping: 11, delay: 0.15 } as const

/** Two little hearts scoot together and squeeze into a hug. */
export function HugHearts() {
  return (
    <div aria-hidden="true" className="relative mx-auto h-28 w-56">
      <motion.div
        className="absolute inset-0"
        animate={{ scale: [1, 1, 1.14, 0.98, 1] }}
        transition={{ duration: 1.5, times: [0, 0.45, 0.62, 0.8, 1] }}
      >
        <motion.span
          className="absolute top-1/2 left-1/2 -mt-8 -ml-8 block"
          initial={{ x: -80, rotate: -28, opacity: 0 }}
          animate={{ x: -20, rotate: -14, opacity: 1 }}
          transition={SPRING}
        >
          <HeartShape className="size-16 text-candy drop-shadow-[0_6px_10px_rgba(219,39,119,0.35)]" />
        </motion.span>
        <motion.span
          className="absolute top-1/2 left-1/2 -mt-8 -ml-8 block"
          initial={{ x: 80, rotate: 28, opacity: 0 }}
          animate={{ x: 20, rotate: 14, opacity: 1 }}
          transition={SPRING}
        >
          <HeartShape className="size-16 text-rose drop-shadow-[0_6px_10px_rgba(219,39,119,0.35)]" />
        </motion.span>
      </motion.div>

      {POPS.map((p, i) => (
        <motion.span
          key={i}
          className="absolute top-1/2 left-1/2 block text-candy"
          style={{ marginLeft: -p.size / 2, marginTop: -p.size / 2 }}
          initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
          animate={{ x: p.x, y: p.y, scale: 1, opacity: [0, 1, 1, 0] }}
          transition={{ duration: 1.3, delay: p.delay, ease: 'easeOut' }}
        >
          <HeartShape style={{ width: p.size, height: p.size }} />
        </motion.span>
      ))}
    </div>
  )
}
