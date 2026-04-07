import { motion } from 'motion/react'
import { type HTMLAttributes, useEffect, useRef, useState } from 'react'
import { cn } from '@/utils/ui'

interface HighlightedTextProps extends HTMLAttributes<HTMLDivElement> {
  highlightColorClassName?: string
  markerColorClassName?: string
  opacity?: number
  animationDuration?: number
  animationDelay?: number
  animate?: boolean
  triggerOnView?: boolean
  repeat?: boolean
}

const MARKER_SIZE = 8
const LINE_HEIGHT = 25
const MARKER_WIDTH = 2
const MARKER_OFFSET_X = 8
const MARKER_OFFSET_Y = 4

export function HighlightedText({
  children,
  highlightColorClassName = 'bg-muted text-muted-foreground',
  markerColorClassName = 'bg-primary',
  opacity = 0.8,
  animationDuration = 0.6,
  animationDelay = 0,
  animate = true,
  triggerOnView = true,
  repeat = false,
  className,
  ...props
}: HighlightedTextProps) {
  const textRef = useRef<HTMLDivElement>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  const [isVisible, setIsVisible] = useState(!triggerOnView)

  const isShouldAnimate = animate && isVisible

  useEffect(() => {
    if (!(triggerOnView && textRef.current)) {
      return
    }
    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (!repeat && observerRef.current) {
            observerRef.current.disconnect()
          }
        } else if (repeat) {
          setIsVisible(false)
        }
      },
      { threshold: 0.1, rootMargin: '-50px' }
    )
    observerRef.current.observe(textRef.current)
    return () => observerRef.current?.disconnect()
  }, [triggerOnView, repeat])

  // Template
  return (
    <div {...props}>
      <div className={cn('relative px-1.5 py-0.5', className)}>
        {/* Content */}
        <motion.div
          animate={isShouldAnimate ? { opacity } : { opacity: 0 }}
          className={cn('rounded p-4', highlightColorClassName)}
          initial={{ opacity: 0 }}
          style={{
            opacity,
            boxDecorationBreak: 'clone',
            WebkitBoxDecorationBreak: 'clone'
          }}
          transition={{
            duration: animationDuration,
            delay: animationDelay,
            ease: 'easeOut'
          }}
        >
          <div ref={textRef}>{children}</div>
        </motion.div>

        {/* Left marker */}
        <motion.span
          animate={isShouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: -5 }}
          className='absolute'
          initial={{ opacity: 0, y: -5 }}
          style={{ top: `-${MARKER_OFFSET_X}px`, left: `-${MARKER_OFFSET_Y}px` }}
          transition={{
            duration: 0.3,
            delay: animationDelay + animationDuration * 0.8,
            ease: 'easeOut'
          }}
        >
          <span
            className={cn('block rounded-full', markerColorClassName)}
            style={{ width: `${MARKER_SIZE}px`, height: `${MARKER_SIZE}px` }}
          />
          <span
            className={cn('block', markerColorClassName)}
            style={{
              width: `${MARKER_WIDTH}px`,
              height: `${LINE_HEIGHT}px`,
              marginLeft: `${(MARKER_SIZE - 2) / 2}px`
            }}
          />
        </motion.span>

        {/* Right marker */}
        <motion.span
          animate={isShouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 5 }}
          className='absolute'
          initial={{ opacity: 0, y: 5 }}
          style={{ bottom: `-${MARKER_OFFSET_X}px`, right: `-${MARKER_OFFSET_Y}px` }}
          transition={{
            duration: 0.3,
            delay: animationDelay + animationDuration,
            ease: 'easeOut'
          }}
        >
          <span
            className={cn('block', markerColorClassName)}
            style={{
              width: `${MARKER_WIDTH}px`,
              height: `${LINE_HEIGHT}px`,
              marginLeft: `${(MARKER_SIZE - 2) / 2}px`
            }}
          />
          <span
            className={cn('block rounded-full', markerColorClassName)}
            style={{ width: `${MARKER_SIZE}px`, height: `${MARKER_SIZE}px` }}
          />
        </motion.span>
      </div>
    </div>
  )
}
