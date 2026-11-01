import { motion } from 'motion/react'
import { Heart } from 'lucide-react'

type Props = {
  label: string
  onClick: () => void
}

/** A soft, squishy pink button with a heart badge. */
export function HeartButton({ label, onClick }: Props) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.05, rotate: -1 }}
      whileTap={{ scale: 0.92 }}
      transition={{ type: 'spring', stiffness: 420, damping: 16 }}
      className="group relative inline-flex items-center gap-3 rounded-full border border-white/80 bg-[linear-gradient(135deg,#FFFFFF_0%,#FDE1EE_45%,#FBCFE8_100%)] py-2.5 pr-6 pl-2.5 text-[1.05rem] font-bold text-berry shadow-[0_14px_30px_-12px_rgba(219,39,119,0.55),inset_0_1px_0_#fff]"
    >
      <span className="grid size-10 place-items-center rounded-full bg-[linear-gradient(135deg,#F472B6,#DB2777)] shadow-[0_4px_10px_-2px_rgba(219,39,119,0.6)] transition-transform group-hover:rotate-12">
        <Heart aria-hidden="true" className="anim-heartbeat size-5 fill-white text-white" strokeWidth={0} />
      </span>
      {label}
    </motion.button>
  )
}
