import { motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { cn } from '@/utils/ui'

interface AnimatedTextProps {
  text: string
  className?: string
  blurEffect?: boolean
  speed?: number
  highlightWords?: string[]
  highlightClassName?: string
  linkWords?: string[]
  linkUrls?: string[]
  linkClassNames?: string[]
}

export function AnimatedText({
  text,
  className,
  blurEffect = true,
  speed = 0.5,
  highlightWords = [],
  highlightClassName,
  linkWords = [],
  linkUrls = [],
  linkClassNames = []
}: AnimatedTextProps) {
  const [visibleCount, setVisibleCount] = useState(0)
  const splitWords = text.split(' ')

  const generateWords = () => {
    return (
      <div>
        {splitWords.map((word, index) => {
          const isVisible = index < visibleCount
          const remaining = splitWords.length - visibleCount
          let capsuleCount = 4

          if (remaining <= 2) {
            capsuleCount = remaining
          } else if (remaining <= 4) {
            capsuleCount = Math.min(3, remaining)
          } else if (visibleCount === 0) {
            capsuleCount = 2
          } else if (visibleCount < 3) {
            capsuleCount = 3
          }

          const isUpcoming = index >= visibleCount && index < visibleCount + capsuleCount
          const isHighlight =
            highlightWords.length > 0 && highlightWords.some((hw) => word.toLowerCase().includes(hw.toLowerCase()))
          const linkIndex = linkWords.findIndex((lw) => word.toLowerCase().includes(lw.toLowerCase()))
          const isLink = linkIndex !== -1

          if (isVisible) {
            const wordElement = (
              <motion.span
                animate={{
                  opacity: 1,
                  filter: blurEffect ? 'blur(0px)' : 'none'
                }}
                className={cn(isHighlight && `font-semibold text-primary ${highlightClassName}`)}
                initial={{
                  opacity: 0,
                  filter: blurEffect ? 'blur(10px)' : 'none'
                }}
                // biome-ignore lint/suspicious/noArrayIndexKey: ignore
                key={`${word}-${index}`}
                transition={{
                  duration: speed * 0.3,
                  ease: 'easeOut'
                }}
              >
                {' '}
                {word}
              </motion.span>
            )

            if (isLink && linkUrls[linkIndex]) {
              return (
                <a
                  className={cn('underline', linkClassNames[linkIndex])}
                  href={linkUrls[linkIndex]}
                  // biome-ignore lint/suspicious/noArrayIndexKey: ignore
                  key={`link-${index}`}
                >
                  {wordElement}
                </a>
              )
            }
            return wordElement
          }

          if (isUpcoming) {
            return (
              <motion.span
                animate={{ opacity: 0.4, scale: 1 }}
                className='rounded-full bg-black dark:bg-gray-600'
                exit={{ opacity: 0, scale: 0.8 }}
                initial={{ opacity: 0, scale: 0.8 }}
                // biome-ignore lint/suspicious/noArrayIndexKey: ignore
                key={`placeholder-${index}`}
                style={{
                  width: `${Math.max(word.length * 0.7, 2.5)}em`,
                  height: '0.9em',
                  display: 'inline-block'
                }}
                transition={{ duration: 0.2 }}
              />
            )
          }

          return null
        })}
      </div>
    )
  }

  useEffect(() => {
    setVisibleCount(0)
    const intervalId = setInterval(
      () => {
        setVisibleCount((prev) => {
          if (prev >= splitWords.length) {
            clearInterval(intervalId)
            return prev
          }
          return prev + 1
        })
      },
      Math.max(speed * 200, 100)
    ) as unknown as number
    return () => clearInterval(intervalId)
  }, [speed, splitWords.length])

  return <div className={cn(className)}>{generateWords()}</div>
}
