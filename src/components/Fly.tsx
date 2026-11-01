/** A tiny, extremely annoying (to Loki) fly with buzzing wings. */
export function Fly({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 28" aria-hidden="true" className={className}>
      <g className="anim-buzz">
        <ellipse cx="11" cy="8" rx="7" ry="5" fill="#E0F2FE" fillOpacity=".85" stroke="#93C5FD" strokeWidth="1" transform="rotate(-25 11 8)" />
        <ellipse cx="21" cy="8" rx="7" ry="5" fill="#E0F2FE" fillOpacity=".85" stroke="#93C5FD" strokeWidth="1" transform="rotate(25 21 8)" />
      </g>
      <ellipse cx="16" cy="17" rx="6" ry="7" fill="#374151" />
      <path d="M11 16h10M11.5 19.5h9" stroke="#6B7280" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="16" cy="10" r="4" fill="#1F2937" />
      <circle cx="13.6" cy="9.4" r="1.9" fill="#B91C1C" />
      <circle cx="18.4" cy="9.4" r="1.9" fill="#B91C1C" />
      <circle cx="13.2" cy="8.9" r=".6" fill="#fff" />
      <circle cx="18" cy="8.9" r=".6" fill="#fff" />
    </svg>
  )
}
