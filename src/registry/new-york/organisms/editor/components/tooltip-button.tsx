import type { LucideProps } from 'lucide-react'
import type { ForwardRefExoticComponent, RefAttributes } from 'react'
import { Button, type ButtonProps } from '@/components/atoms/button'
import { Kbd } from '@/components/atoms/kbd'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/atoms/tooltip'
import { cn } from '@/utils/ui'

export default function TooltipButton({
  Icon,
  label,
  isActive,
  kbd,
  className,
  ...props
}: {
  Icon: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>
  label: string
  isActive?: boolean
  kbd?: string
} & ButtonProps) {
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            className={cn(
              {
                'bg-accent text-accent-foreground': isActive
              },
              className
            )}
            size='icon'
            variant='ghost'
            {...props}
          >
            <Icon />
          </Button>
        }
      />
      <TooltipContent className='flex items-center gap-1'>
        <span>{label}</span>
        {kbd && <Kbd>{kbd}</Kbd>}
      </TooltipContent>
    </Tooltip>
  )
}
