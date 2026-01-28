import type { HTMLAttributes, PropsWithChildren } from 'react'
import { cn } from '@/utils/ui'

// Animated testimonial canopy
export interface AnimatedTestimonialCanopyProps extends HTMLAttributes<HTMLDivElement> {
  isVertical?: boolean
  repeat?: number
  isReverse?: boolean
  isPauseOnHover?: boolean
  isApplyMask?: boolean
  maskClassName?: string
}

export const AnimatedTestimonialCanopy = ({
  children,
  isVertical = false,
  repeat = 2,
  isPauseOnHover = false,
  isReverse = false,
  className,
  isApplyMask = true,
  maskClassName,
  ...props
}: AnimatedTestimonialCanopyProps) => {
  // Template
  return (
    <div
      {...props}
      className={cn(
        'group relative flex h-full w-full gap-(--gap) overflow-hidden [--gap:0.5rem] [--transition-duration:8s]',
        isVertical ? 'flex-col' : 'flex-row',
        { 'direction-[isReverse]': isReverse },
        className
      )}
    >
      {isApplyMask && (
        <div
          className={cn(
            'pointer-events-none absolute inset-0 h-full w-full bg-accent/40',
            isVertical ? 'bg-linear-to-b' : 'bg-linear-to-r',
            maskClassName
          )}
        />
      )}

      {Array.from({ length: repeat }).map((_, index) => (
        <div
          className={cn('flex shrink-0 gap-(--gap)', {
            'group-hover:paused': isPauseOnHover,
            'direction-[reverse]': isReverse,
            'animate-canopy-horizontal flex-row': !isVertical,
            'animate-canopy-isVertical flex-col': isVertical
          })}
          // biome-ignore lint/suspicious/noArrayIndexKey: ignore
          key={`item-${index}`}
        >
          {children}
        </div>
      ))}
    </div>
  )
}

// Animated testimonial card
interface AnimatedTestimonialCardProps extends PropsWithChildren {
  className?: string
}

export const AnimatedTestimonialCard = ({ className, children }: AnimatedTestimonialCardProps) => {
  // Template
  return <div className={cn('mx-2', className)}>{children}</div>
}

// Animated testimonial
export interface AnimatedTestimonialProps extends PropsWithChildren {
  className?: string
}

export const AnimatedTestimonial = ({ className, children }: AnimatedTestimonialProps) => {
  // Template
  return <div className={cn('w-full overflow-x-hidden', className)}>{children}</div>
}
