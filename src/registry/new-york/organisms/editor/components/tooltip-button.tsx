import type { LucideProps } from 'lucide-react'
import { type ForwardRefExoticComponent, memo, type RefAttributes } from 'react'
import { Button, type ButtonProps } from '@/registry/new-york/ui/button/components/button'
import { Kbd } from '@/registry/new-york/ui/kbd/components/kbd'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/registry/new-york/ui/tooltip/components/tooltip'
import { cn } from '@/utils/ui'

// Component
const TooltipButton = memo(
  ({
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
  } & ButtonProps) => {
    // Template
    return (
      <Tooltip>
        <TooltipTrigger asChild>
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
        </TooltipTrigger>

        <TooltipContent className='flex items-center gap-1'>
          <span>{label}</span>
          {kbd && <Kbd>{kbd}</Kbd>}
        </TooltipContent>
      </Tooltip>
    )
  }
)

TooltipButton.displayName = 'TooltipButton'
export default TooltipButton
