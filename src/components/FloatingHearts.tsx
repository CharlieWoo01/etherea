import { useMemo } from 'react'
import { HeartShape, type CSSVars } from './shapes'

const COLOURS = ['#F472B6', '#FBCFE8', '#F9A8D4', '#DB2777', '#E9D5FF', '#FFFFFF']

const random = (min: number, max: number) => min + Math.random() * (max - min)

/** Hearts that drift slowly up the screen forever. Pure CSS for smoothness on phones. */
export function FloatingHearts({ count = 16 }: { count?: number }) {
  const hearts = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const duration = random(16, 30)
        return {
          id: i,
          left: random(2, 94),
          size: random(12, 30),
          duration,
          delay: random(0, duration),
          sway: random(8, 26),
          swayDuration: random(4, 7),
          opacity: random(0.35, 0.8),
          rest: random(12, 95),
          colour: COLOURS[i % COLOURS.length],
        }
      }),
    [count],
  )

  return (
    <div className="absolute inset-0">
      {hearts.map((h) => (
        <span
          key={h.id}
          className="anim-rise absolute -bottom-12"
          style={
            {
              left: `${h.left}%`,
              animationDelay: `-${h.delay}s`,
              '--dur': `${h.duration}s`,
              '--o': h.opacity,
              '--rest': `${h.rest}vh`,
            } as CSSVars
          }
        >
          <span className="anim-sway block" style={{ '--sway': `${h.sway}px`, '--sdur': `${h.swayDuration}s` } as CSSVars}>
            <HeartShape style={{ width: h.size, height: h.size, color: h.colour }} />
          </span>
        </span>
      ))}
    </div>
  )
}
