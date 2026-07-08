import type { HTMLAttributes, PropsWithChildren } from 'react'
import { cn } from '@/utils/ui'

export interface AnimatedTestimonialCanopyProps extends HTMLAttributes<HTMLDivElement> {
  isApplyMask?: boolean
  isPauseOnHover?: boolean
  isReverse?: boolean
  isVertical?: boolean
  maskClassName?: string
  repeat?: number
}

export function AnimatedTestimonialCanopy({
  children,
  isVertical = false,
  repeat = 2,
  isPauseOnHover = false,
  isReverse = false,
  className,
  isApplyMask = true,
  maskClassName,
  ...props
}: AnimatedTestimonialCanopyProps) {
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
            'animate-canopy-horizontal flex-row': !isVertical,
            'animate-canopy-isVertical flex-col': isVertical,
            'direction-[reverse]': isReverse,
            'group-hover:paused': isPauseOnHover
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

interface AnimatedTestimonialCardProps extends PropsWithChildren {
  className?: string
}

export function AnimatedTestimonialCard({ className, children }: AnimatedTestimonialCardProps) {
  return <div className={cn('mx-2', className)}>{children}</div>
}

export interface AnimatedTestimonialProps extends PropsWithChildren {
  className?: string
}

export function AnimatedTestimonial({ className, children }: AnimatedTestimonialProps) {
  return <div className={cn('w-full overflow-x-hidden', className)}>{children}</div>
}
