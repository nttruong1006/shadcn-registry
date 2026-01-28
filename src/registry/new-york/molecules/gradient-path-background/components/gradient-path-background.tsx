import { motion } from 'motion/react'
import type { PropsWithChildren } from 'react'
import { cn } from '@/utils/ui'

// Gradient path background
interface GradientPathBackgroundProps extends PropsWithChildren {
  className?: string
  svgOptions?: {
    opacityOnAnimate?: number
    duration?: number
  }
}

export const GradientPathBackground = ({ children, className, svgOptions }: GradientPathBackgroundProps) => {
  return (
    <div className={cn('relative w-full', className)}>
      <PathSVG {...svgOptions} />
      <div className='z-10'>{children}</div>
    </div>
  )
}

const circuits = [
  'M 50 100 L 200 100 L 200 200 L 350 200 L 350 300 L 500 300',
  'M 500 50 L 500 150 L 650 150 L 650 250 L 800 250 L 800 350',
  'M 100 400 L 250 400 L 250 500 L 400 500 L 400 600 L 550 600',
  'M 600 400 L 750 400 L 750 500 L 900 500 L 900 600',
  'M 50 300 L 150 300 L 150 450 L 300 450 L 300 550',
  'M 700 100 L 850 100 L 850 200 L 950 200',
  'M 150 200 L 300 200 L 300 350 L 450 350 L 450 450',
  'M 550 150 L 700 150 L 700 300 L 850 300'
]

const nodes = [
  { x: 200, y: 100 },
  { x: 350, y: 200 },
  { x: 500, y: 300 },
  { x: 500, y: 150 },
  { x: 650, y: 150 },
  { x: 800, y: 350 },
  { x: 250, y: 400 },
  { x: 400, y: 500 },
  { x: 750, y: 400 },
  { x: 150, y: 300 },
  { x: 300, y: 450 },
  { x: 850, y: 100 }
]

const PathSVG = ({ opacityOnAnimate = 1, duration }: GradientPathBackgroundProps['svgOptions'] = {}) => {
  // Template
  return (
    <motion.svg
      animate={{ opacity: opacityOnAnimate }}
      className='absolute inset-0 size-full'
      fill='none'
      initial={{ opacity: 0 }}
      transition={{ duration: 1 }}
      viewBox='0 0 1000 700'
      xmlns='http://www.w3.org/2000/svg'
    >
      <title>Path background</title>

      <defs>
        <linearGradient id='circuitGradientLight'>
          <stop offset='0%' stopColor='#10b981' />
          <stop offset='50%' stopColor='#3b82f6' />
          <stop offset='100%' stopColor='#8b5cf6' />
        </linearGradient>
        <linearGradient id='circuitGradientDark'>
          <stop offset='0%' stopColor='#00ff41' />
          <stop offset='50%' stopColor='#00d9ff' />
          <stop offset='100%' stopColor='#7c3aed' />
        </linearGradient>
        <filter id='circuitGlowLight'>
          <feGaussianBlur result='coloredBlur' stdDeviation='1.5' />
          <feMerge>
            <feMergeNode in='coloredBlur' />
            <feMergeNode in='SourceGraphic' />
          </feMerge>
        </filter>
        <filter id='circuitGlowDark'>
          <feGaussianBlur result='coloredBlur' stdDeviation='2' />
          <feMerge>
            <feMergeNode in='coloredBlur' />
            <feMergeNode in='SourceGraphic' />
          </feMerge>
        </filter>
      </defs>

      {circuits.map((path, index) => (
        <motion.path
          animate={{
            pathLength: [0, 1, 0.8, 1],
            opacity: [0, 1, 0.4, 1]
          }}
          className='dark:filter-[url(#circuitGlowDark)] dark:stroke-[url(#circuitGradientDark)]'
          d={path}
          fill='none'
          filter='url(#circuitGlowLight)'
          initial={{ pathLength: 0, opacity: 0 }}
          // biome-ignore lint/suspicious/noArrayIndexKey: ignore
          key={`circuit-${index}`}
          stroke='url(#circuitGradientLight)'
          strokeLinecap='round'
          strokeWidth='3'
          transition={{
            duration: duration || 6,
            repeat: Number.POSITIVE_INFINITY,
            delay: index * 0.5,
            ease: 'easeInOut'
          }}
        />
      ))}

      {nodes.map((node, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: ignore
        <motion.g key={`node-${index}`}>
          <motion.circle
            animate={{ scale: [0, 1.3, 1, 1.1, 1] }}
            className='dark:filter-[url(#circuitGlowDark)] dark:fill-[url(#circuitGradientDark)]'
            cx={node.x}
            cy={node.y}
            fill='url(#circuitGradientLight)'
            filter='url(#circuitGlowLight)'
            initial={{ scale: 0 }}
            r='6'
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: index * 0.3,
              ease: 'easeInOut'
            }}
          />
          <motion.circle
            animate={{ scale: [0, 1.5, 1.2, 1.5] }}
            className='dark:stroke-[url(#circuitGradientDark)]'
            cx={node.x}
            cy={node.y}
            fill='none'
            initial={{ scale: 0 }}
            opacity='0.5'
            r='12'
            stroke='url(#circuitGradientLight)'
            strokeWidth='1'
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              delay: index * 0.3,
              ease: 'easeInOut'
            }}
          />
        </motion.g>
      ))}
    </motion.svg>
  )
}
