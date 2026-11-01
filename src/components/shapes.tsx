import { useId, type CSSProperties, type SVGProps } from 'react'

/** Lets inline styles carry CSS custom properties without casts everywhere. */
export type CSSVars = CSSProperties & Record<`--${string}`, string | number>

export const HEART_PATH =
  'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'

const SPARKLE_PATH = 'M12 0C12.7 7 17 11.3 24 12 17 12.7 12.7 17 12 24 11.3 17 7 12.7 0 12 7 11.3 11.3 7 12 0Z'

type ShapeProps = SVGProps<SVGSVGElement>

export function HeartShape(props: ShapeProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d={HEART_PATH} fill="currentColor" />
    </svg>
  )
}

export function SparkleShape(props: ShapeProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d={SPARKLE_PATH} fill="currentColor" />
    </svg>
  )
}

/** A glossy candy-pink bow with little ribbon tails. */
export function Bow(props: ShapeProps) {
  const id = useId()
  return (
    <svg viewBox="0 0 120 100" aria-hidden="true" {...props}>
      <defs>
        <linearGradient id={`${id}-loop`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F9A8D4" />
          <stop offset="1" stopColor="#EC4899" />
        </linearGradient>
        <linearGradient id={`${id}-tail`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#EC4899" />
          <stop offset="1" stopColor="#DB2777" />
        </linearGradient>
      </defs>
      <path d="M55 47 L38 92 L48 86 L53 97 L64 51Z" fill={`url(#${id}-tail)`} />
      <path d="M65 47 L82 92 L72 86 L67 97 L56 51Z" fill={`url(#${id}-tail)`} />
      <path d="M60 44 C42 16 10 12 8 34 C6 54 38 58 60 48Z" fill={`url(#${id}-loop)`} />
      <path d="M60 44 C78 16 110 12 112 34 C114 54 82 58 60 48Z" fill={`url(#${id}-loop)`} />
      <path d="M58 45 C44 30 26 26 22 34" stroke="#DB2777" strokeOpacity=".35" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M62 45 C76 30 94 26 98 34" stroke="#DB2777" strokeOpacity=".35" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M18 28 C22 22 30 20 36 22" stroke="#fff" strokeOpacity=".7" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M84 22 C90 20 98 22 102 28" stroke="#fff" strokeOpacity=".7" strokeWidth="3" fill="none" strokeLinecap="round" />
      <rect x="51" y="36" width="18" height="18" rx="7" fill="#DB2777" />
      <rect x="55" y="39" width="7" height="4" rx="2" fill="#fff" fillOpacity=".45" />
    </svg>
  )
}

/** A slightly wobbly wax seal with an embossed heart. */
export function WaxSeal(props: ShapeProps) {
  const id = useId()
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" {...props}>
      <defs>
        <radialGradient id={`${id}-wax`} cx="38%" cy="32%" r="75%">
          <stop offset="0" stopColor="#F472B6" />
          <stop offset=".55" stopColor="#DB2777" />
          <stop offset="1" stopColor="#9D174D" />
        </radialGradient>
      </defs>
      <path
        d="M32 3C40 3 44 7 50 9 57 12 61 19 61 27 62 34 60 40 57 46 53 53 47 59 39 60 33 62 27 61 21 59 13 56 7 50 5 42 3 35 3 28 6 21 9 13 16 7 24 4 27 3 29 3 32 3Z"
        fill={`url(#${id}-wax)`}
      />
      <circle cx="32" cy="32" r="20" fill="none" stroke="#9D174D" strokeOpacity=".45" strokeWidth="2" />
      <circle cx="32" cy="32" r="18" fill="none" stroke="#FBCFE8" strokeOpacity=".35" strokeWidth="1" />
      <g transform="translate(20 20.5) scale(1)">
        <path d={HEART_PATH} fill="#9D174D" fillOpacity=".55" transform="translate(.6 1)" />
        <path d={HEART_PATH} fill="#FBCFE8" fillOpacity=".9" />
      </g>
      <ellipse cx="22" cy="17" rx="7" ry="3.5" fill="#fff" fillOpacity=".35" transform="rotate(-30 22 17)" />
    </svg>
  )
}

/** A delicate floral sprig for the letter's corners (drawn for the top-left). */
export function CornerFlourish(props: ShapeProps) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" {...props}>
      <g fill="none" stroke="#F9A8D4" strokeWidth="1.4" strokeLinecap="round">
        <path d="M8 8C30 12 48 26 64 50" />
        <path d="M8 8C12 30 26 48 50 64" />
        <path d="M30 15C34 8 40 6 46 7" />
        <path d="M15 30C8 34 6 40 7 46" />
      </g>
      <g fill="#FBCFE8">
        <ellipse cx="28" cy="16" rx="5" ry="2.4" transform="rotate(30 28 16)" />
        <ellipse cx="44" cy="28" rx="5" ry="2.4" transform="rotate(50 44 28)" />
        <ellipse cx="16" cy="28" rx="5" ry="2.4" transform="rotate(60 16 28)" />
        <ellipse cx="28" cy="44" rx="5" ry="2.4" transform="rotate(40 28 44)" />
      </g>
      <g transform="translate(64 50)">
        {[0, 72, 144, 216, 288].map((r) => (
          <ellipse key={r} cx="0" cy="-4.5" rx="3" ry="4.2" fill="#F9A8D4" transform={`rotate(${r})`} />
        ))}
        <circle r="2.2" fill="#DB2777" />
      </g>
      <g transform="translate(43 56) scale(.55)" fill="#F472B6">
        <path d={HEART_PATH} />
      </g>
      <g transform="translate(9 9)">
        {[0, 72, 144, 216, 288].map((r) => (
          <ellipse key={r} cx="0" cy="-5.5" rx="3.6" ry="5" fill="#FBCFE8" transform={`rotate(${r + 36})`} />
        ))}
        <circle r="2.8" fill="#F472B6" />
      </g>
      <circle cx="47" cy="7" r="1.6" fill="#F472B6" />
      <circle cx="7" cy="47" r="1.6" fill="#F472B6" />
      <circle cx="56" cy="38" r="1.2" fill="#E9D5FF" />
      <circle cx="38" cy="56" r="1.2" fill="#E9D5FF" />
    </svg>
  )
}
