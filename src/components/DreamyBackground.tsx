import { useId } from 'react'
import { FloatingHearts } from './FloatingHearts'
import { Sparkles } from './Sparkles'
import type { CSSVars } from './shapes'

function Cloud({ className, style }: { className?: string; style?: CSSVars }) {
  const id = useId()
  return (
    <svg viewBox="0 0 220 110" className={className} style={style} aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".95" />
          <stop offset="1" stopColor="#FCE7F3" stopOpacity=".7" />
        </linearGradient>
      </defs>
      <path
        d="M48 96C26 96 12 84 12 68s13-28 30-28c3-20 20-34 41-34 18 0 33 10 39 25 5-3 11-4 17-4 21 0 37 15 38 34 15 2 31 12 31 30 0 3-1 5-2 5H48Z"
        fill={`url(#${id})`}
      />
    </svg>
  )
}

/** The shared sky behind every experience: gradient, glowing blobs, clouds, hearts and stars. */
export function DreamyBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(165deg,#FFF5FA_0%,#FDE8F3_38%,#FCE4F4_66%,#F5EAFF_100%)]" />

      <div
        className="anim-blob absolute -left-[20vw] -top-[15vh] h-[70vh] w-[70vh] rounded-full bg-[radial-gradient(closest-side,rgba(251,207,232,0.9),transparent)]"
        style={{ '--dur': '24s', '--bx': '8vw', '--by': '6vh' } as CSSVars}
      />
      <div
        className="anim-blob absolute -right-[25vw] top-[20vh] h-[75vh] w-[75vh] rounded-full bg-[radial-gradient(closest-side,rgba(233,213,255,0.75),transparent)]"
        style={{ '--dur': '28s', '--bx': '-6vw', '--by': '-4vh' } as CSSVars}
      />
      <div
        className="anim-blob absolute -bottom-[25vh] left-[10vw] h-[65vh] w-[65vh] rounded-full bg-[radial-gradient(closest-side,rgba(244,114,182,0.28),transparent)]"
        style={{ '--dur': '20s', '--bx': '5vw', '--by': '-5vh' } as CSSVars}
      />
      <div className="absolute left-1/2 top-1/2 h-[60vh] w-[60vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(255,251,247,0.85),transparent)]" />

      <Cloud className="anim-drift absolute left-[-6%] top-[7%] w-[46vw] max-w-[300px] opacity-80" style={{ '--dur': '38s' }} />
      <Cloud className="anim-drift absolute right-[-8%] top-[40%] w-[40vw] max-w-[260px] opacity-60" style={{ '--dur': '46s' }} />
      <Cloud className="anim-drift absolute bottom-[6%] left-[4%] w-[34vw] max-w-[220px] opacity-70" style={{ '--dur': '42s' }} />

      <Sparkles />
      <FloatingHearts />
    </div>
  )
}
