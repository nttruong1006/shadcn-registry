import { ArrowUpRightIcon } from 'lucide-react'
import { Badge } from '@/components/atoms/badge'
import { SHADCN_URL } from '@/constants/base'
import { cn } from '@/utils/ui'
import type { ModuleProps } from './lib'

// Component
const ShadcnLinkButton = ({ registryName, className }: ModuleProps) => {
  // Template
  return (
    <Badge
      className={cn('mb-10 no-underline', className)}
      render={
        <a href={`${SHADCN_URL}/${registryName}`} rel='noreferrer' target='_blank'>
          <span>Docs</span>
          <ArrowUpRightIcon />
        </a>
      }
    />
  )
}

export default ShadcnLinkButton
