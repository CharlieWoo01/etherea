import { useCallback, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Envelope } from '../components/Envelope'
import { LetterEnding } from '../components/LetterEnding'
import { LetterPaper } from '../components/LetterPaper'
import { letter } from '../content/letter'
import { letterScene } from '../content/site'

const EASE_OUT = [0.22, 1, 0.36, 1] as const

type Props = {
  onClose: () => void
  onMeetLoki: () => void
  /** Skip the envelope, e.g. when coming back from Loki's page. */
  startOpen?: boolean
}

export function LetterPage({ onClose, onMeetLoki, startOpen = false }: Props) {
  const [opened, setOpened] = useState(startOpen)
  const handleOpened = useCallback(() => setOpened(true), [])

  return (
    <motion.main
      className="relative z-10 flex min-h-dvh flex-col items-center px-4 pt-[max(3rem,env(safe-area-inset-top))] pb-10 sm:px-6 sm:pt-16 [@media(max-height:700px)]:pt-[max(1.5rem,env(safe-area-inset-top))]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.header
        className="max-w-lg text-center"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 1, ease: EASE_OUT }}
      >
        <h1 className="font-hand text-[2.6rem] leading-[1.05] font-bold text-rose sm:text-[3.4rem] [@media(max-height:700px)]:text-[2.2rem]">
          {letterScene.title}
        </h1>
        <p className="mx-auto mt-3 max-w-sm font-display text-[1.05rem] leading-relaxed text-berry/80 italic sm:text-lg [@media(max-height:700px)]:mt-2 [@media(max-height:700px)]:text-base">
          {letterScene.subtitle}
        </p>
      </motion.header>

      <AnimatePresence mode="wait">
        {!opened ? (
          <motion.section
            key="envelope"
            className="flex w-full flex-1 flex-col items-center justify-center pt-2 pb-4"
            initial={{ opacity: 0, y: 30, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.94, transition: { duration: 0.4, ease: 'easeIn' } }}
            transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.1 }}
          >
            <Envelope label={letterScene.envelopeLabel} ariaLabel={letterScene.envelopeAriaLabel} onOpened={handleOpened} />
            <motion.p
              className="mt-10 font-hand text-2xl text-rose/80 [@media(max-height:700px)]:mt-7"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.45, 1, 0.45] }}
              transition={{ delay: 1.2, duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
            >
              {letterScene.hint} ♡
            </motion.p>
          </motion.section>
        ) : (
          <motion.section key="letter" className="w-full pt-10" initial={{ opacity: 1 }}>
            <LetterPaper content={letter} />
            <LetterEnding onClose={onClose} onMeetLoki={onMeetLoki} />
          </motion.section>
        )}
      </AnimatePresence>
    </motion.main>
  )
}
