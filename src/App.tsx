import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, MotionConfig } from 'motion/react'
import { DreamyBackground } from './components/DreamyBackground'
import { LandingPage } from './pages/LandingPage'
import { LetterPage } from './pages/LetterPage'
import { LokiPage } from './pages/LokiPage'
import { TransitionPage } from './pages/TransitionPage'

/**
 * Etherea is a sequence of "scenes" sharing one dreamy sky. To add a new
 * experience: create a page in src/pages, add its id here, and render it below.
 */
type Scene = 'landing' | 'transition' | 'letter' | 'loki'

/** Scenes with their own shareable link (…/etherea/#loki). */
const LINKABLE: Scene[] = ['loki']

const sceneFromHash = (): Scene => {
  const hash = window.location.hash.slice(1) as Scene
  return LINKABLE.includes(hash) ? hash : 'landing'
}

export default function App() {
  const [scene, setScene] = useState<Scene>(sceneFromHash)
  const [letterAlreadyOpen, setLetterAlreadyOpen] = useState(false)

  const toLanding = useCallback(() => setScene('landing'), [])
  const toTransition = useCallback(() => {
    setLetterAlreadyOpen(false)
    setScene('transition')
  }, [])
  const toLetter = useCallback(() => setScene('letter'), [])
  const toLoki = useCallback(() => setScene('loki'), [])
  const backToLetter = useCallback(() => {
    setLetterAlreadyOpen(true)
    setScene('letter')
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0 })
    const hash = LINKABLE.includes(scene) ? `#${scene}` : ''
    if (window.location.hash !== hash) {
      history.replaceState(null, '', `${window.location.pathname}${window.location.search}${hash}`)
    }
  }, [scene])

  return (
    <MotionConfig reducedMotion="user">
      <DreamyBackground />
      <AnimatePresence mode="wait">
        {scene === 'landing' && <LandingPage key="landing" onBegin={toTransition} />}
        {scene === 'transition' && <TransitionPage key="transition" onDone={toLetter} />}
        {scene === 'letter' && (
          <LetterPage key="letter" onClose={toLanding} onMeetLoki={toLoki} startOpen={letterAlreadyOpen} />
        )}
        {scene === 'loki' && <LokiPage key="loki" onBackToLetter={backToLetter} onRestart={toLanding} />}
      </AnimatePresence>
    </MotionConfig>
  )
}
