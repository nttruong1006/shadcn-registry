import { ArrowUpRightIcon } from 'lucide-react'
import { SHADCN_URL } from '@/constants/base'
import { Badge } from '@/registry/new-york/ui/badge/components/badge'
import { cn } from '@/utils/ui'
import type { ModuleProps } from './lib'

// Component
const ShadcnLinkButton = ({ registryName, className }: ModuleProps) => {
  // Template
  return (
    <Badge asChild className={cn('mb-10 no-underline', className)} variant='secondary'>
      <a href={`${SHADCN_URL}/${registryName}`} rel='noreferrer' target='_blank'>
        <span>Docs</span>
        <ArrowUpRightIcon />
      </a>
    </Badge>
  )
}

export default ShadcnLinkButton
