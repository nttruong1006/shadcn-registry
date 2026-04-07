import { ArrowUpRight } from 'lucide-react'
import { Badge } from '@/registry/new-york/atoms/badge/components/badge'
import { cn } from '@/utils/ui'
import type { ModuleProps } from './lib'

// Component
const DocLinkButton = ({ link, className }: ModuleProps) => {
  // Template
  return (
    <Badge
      className={cn('mb-10 no-underline', className)}
      render={
        <a href={link} rel='noreferrer' target='_blank'>
          <span>Docs</span>
          <ArrowUpRight />
        </a>
      }
      variant='secondary'
    />
  )
}

export default DocLinkButton
