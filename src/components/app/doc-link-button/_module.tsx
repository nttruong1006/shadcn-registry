import { ArrowUpRight } from 'lucide-react'
import { Badge } from '@/registry/new-york/ui/badge/components/badge'
import { cn } from '@/utils/ui'
import type { ModuleProps } from './lib'

// Component
const DocLinkButton = ({ link, className }: ModuleProps) => {
  // Template
  return (
    <Badge asChild className={cn('mb-10 no-underline', className)} variant='secondary'>
      <a href={link} rel='noreferrer' target='_blank'>
        <span>Docs</span>
        <ArrowUpRight />
      </a>
    </Badge>
  )
}

export default DocLinkButton
