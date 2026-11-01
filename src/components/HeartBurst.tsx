import { useMemo } from 'react'
import { createPortal } from 'react-dom'
import { motion } from 'motion/react'
import { HeartShape } from './shapes'

const COLOURS = ['#F472B6', '#DB2777', '#F9A8D4', '#FBCFE8', '#E9D5FF', '#EC4899']

const random = (min: number, max: number) => min + Math.random() * (max - min)

type Props = {
  /** "up" drifts hearts up from below; "down" showers them from above. */
  direction: 'up' | 'down'
  count?: number
}

/** A one-off flurry of hearts across the whole screen. Remount (change `key`) to replay. */
export function HeartBurst({ direction, count = 30 }: Props) {
  const hearts = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: random(0, 96),
        size: random(10, direction === 'up' ? 34 : 22),
        delay: random(0, direction === 'up' ? 1.4 : 0.9),
        duration: random(2.6, 4.2),
        sway: random(-40, 40),
        spin: random(-50, 50),
        colour: COLOURS[i % COLOURS.length],
      })),
    [count, direction],
  )

  const vh = window.innerHeight / 100
  const [from, to] = direction === 'up' ? [110 * vh, -15 * vh] : [-10 * vh, 110 * vh]

  return createPortal(
    // Rising hearts drift behind the page's text; a shower falls over everything.
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 overflow-hidden ${direction === 'up' ? 'z-[5]' : 'z-50'}`}
    >
      {hearts.map((h) => (
        <motion.span
          key={h.id}
          className="absolute top-0 block"
          style={{ left: `${h.left}%`, color: h.colour }}
          initial={{ y: from, x: 0, rotate: 0, opacity: 0 }}
          animate={{ y: to, x: [0, h.sway, -h.sway / 2, h.sway / 3], rotate: h.spin, opacity: [0, 1, 1, 0] }}
          transition={{ duration: h.duration, delay: h.delay, ease: direction === 'up' ? 'easeOut' : 'easeIn' }}
        >
          <HeartShape className="drop-shadow-[0_2px_6px_rgba(219,39,119,0.25)]" style={{ width: h.size, height: h.size }} />
        </motion.span>
      ))}
    </div>,
    document.body,
  )
}
