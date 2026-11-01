import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import { Heart } from 'lucide-react'

type Props = {
  children: ReactNode
  onClick: () => void
  /** Gently bob up and down to invite a tap. */
  float?: boolean
  size?: 'lg' | 'md'
}

/** The signature candy-pink pill: soft glow, beating heart, a shine that sweeps across. */
export function GlowButton({ children, onClick, float = true, size = 'lg' }: Props) {
  const padding = size === 'lg' ? 'px-6 py-4 text-[0.98rem] sm:px-9 sm:text-lg' : 'px-6 py-3.5 text-base'

  return (
    <motion.div
      className="relative inline-block"
      animate={float ? { y: [0, -6, 0] } : undefined}
      transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
    >
      <span
        aria-hidden="true"
        className="anim-glow absolute -inset-4 rounded-full bg-[radial-gradient(closest-side,rgba(244,114,182,0.6),transparent)] blur-md"
      />
      <motion.button
        type="button"
        onClick={onClick}
        whileHover={{ scale: 1.045, y: -2 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 400, damping: 18 }}
        className={`group relative overflow-hidden rounded-full bg-[linear-gradient(135deg,#F9A8D4_0%,#F472B6_35%,#DB2777_100%)] font-semibold text-white shadow-[0_14px_32px_-10px_rgba(219,39,119,0.7),inset_0_1px_0_rgba(255,255,255,0.55),inset_0_-2px_6px_rgba(131,24,67,0.18)] [text-shadow:0_1px_2px_rgba(131,24,67,0.45)] ${padding}`}
      >
        <span
          aria-hidden="true"
          className="anim-shine absolute inset-y-0 left-0 w-1/4 bg-linear-to-r from-transparent via-white/45 to-transparent"
        />
        <span aria-hidden="true" className="absolute inset-x-4 top-1 h-1/3 rounded-full bg-white/25 blur-[2px]" />
        <span className="relative flex max-w-[16.5rem] items-center justify-center gap-2.5 text-balance sm:max-w-none">
          <Heart aria-hidden="true" className="anim-heartbeat size-5 shrink-0 fill-white" strokeWidth={0} />
          {children}
        </span>
      </motion.button>
    </motion.div>
  )
}
