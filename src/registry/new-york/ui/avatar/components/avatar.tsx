import { Fallback, Image, Root } from '@radix-ui/react-avatar'
import type { ComponentProps } from 'react'
import { cn } from '@/utils/ui'

// Avatar
export const Avatar = ({ className, ...props }: ComponentProps<typeof Root>) => {
  // Template
  return (
    <Root
      className={cn('relative flex size-8 shrink-0 overflow-hidden rounded-full', className)}
      data-slot='avatar'
      {...props}
    />
  )
}

// Avatar image
export const AvatarImage = ({ className, ...props }: ComponentProps<typeof Image>) => {
  // Template
  return <Image className={cn('aspect-square size-full', className)} data-slot='avatar-image' {...props} />
}

// Avatar fallback
export const AvatarFallback = ({ className, ...props }: ComponentProps<typeof Fallback>) => {
  // Template
  return (
    <Fallback
      className={cn('flex size-full items-center justify-center rounded-full bg-muted', className)}
      data-slot='avatar-fallback'
      {...props}
    />
  )
}
