import { SparkleShape } from './shapes'

const SIZES = {
  xl: 'text-[4.75rem] sm:text-[7.5rem]',
  sm: 'text-[1.9rem]',
}

/** The "etherea." wordmark. */
export function Logo({ size = 'xl' }: { size?: keyof typeof SIZES }) {
  return (
    <span className={`relative inline-block font-display leading-none font-normal tracking-tight italic ${SIZES[size]}`}>
      <span className="text-gradient pr-[0.06em]">etherea</span>
      <span className="text-candy">.</span>
      {size === 'xl' && (
        <>
          <SparkleShape className="anim-twinkle absolute -top-1 -right-5 size-6 text-candy sm:size-8" />
          <SparkleShape
            className="anim-twinkle absolute -bottom-1 -left-4 size-4 text-lavender sm:size-5"
            style={{ animationDelay: '1.4s' }}
          />
        </>
      )}
    </span>
  )
}
