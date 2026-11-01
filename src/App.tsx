import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, MotionConfig } from 'motion/react'
import { DreamyBackground } from './components/DreamyBackground'
import { LandingPage } from './pages/LandingPage'
import { LetterPage } from './pages/LetterPage'
import { TransitionPage } from './pages/TransitionPage'

/**
 * Etherea is a sequence of "scenes" sharing one dreamy sky. To add a new
 * experience: create a page in src/pages, add its id here, and render it below.
 */
type Scene = 'landing' | 'transition' | 'letter'

export default function App() {
  const [scene, setScene] = useState<Scene>('landing')

  const toLanding = useCallback(() => setScene('landing'), [])
  const toTransition = useCallback(() => setScene('transition'), [])
  const toLetter = useCallback(() => setScene('letter'), [])

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [scene])

  return (
    <MotionConfig reducedMotion="user">
      <DreamyBackground />
      <AnimatePresence mode="wait">
        {scene === 'landing' && <LandingPage key="landing" onBegin={toTransition} />}
        {scene === 'transition' && <TransitionPage key="transition" onDone={toLetter} />}
        {scene === 'letter' && <LetterPage key="letter" onClose={toLanding} />}
      </AnimatePresence>
    </MotionConfig>
  )
}
