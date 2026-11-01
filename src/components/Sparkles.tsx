import { useMemo } from 'react'
import { SparkleShape, type CSSVars } from './shapes'

const COLOURS = ['#FFFFFF', '#F472B6', '#F9A8D4', '#E9D5FF', '#FFFFFF']

const random = (min: number, max: number) => min + Math.random() * (max - min)

/** Tiny twinkling stars scattered across the sky. */
export function Sparkles({ count = 24 }: { count?: number }) {
  const sparkles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        top: random(3, 95),
        left: random(3, 95),
        size: random(6, 15),
        duration: random(2.4, 5),
        delay: random(0, 5),
        colour: COLOURS[i % COLOURS.length],
      })),
    [count],
  )

  return (
    <div className="absolute inset-0">
      {sparkles.map((s) => (
        <SparkleShape
          key={s.id}
          className="anim-twinkle absolute drop-shadow-[0_0_4px_rgba(255,255,255,0.9)]"
          style={
            {
              top: `${s.top}%`,
              left: `${s.left}%`,
              width: s.size,
              height: s.size,
              color: s.colour,
              animationDelay: `${s.delay}s`,
              '--dur': `${s.duration}s`,
            } as CSSVars
          }
        />
      ))}
    </div>
  )
}
