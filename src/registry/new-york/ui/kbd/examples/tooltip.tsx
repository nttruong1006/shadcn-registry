import { Button } from '@/registry/new-york/ui/button/components/button'
import { ButtonGroup } from '@/registry/new-york/ui/button-group/components/button-group'
import { Kbd, KbdGroup } from '@/registry/new-york/ui/kbd/components/kbd'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/registry/new-york/ui/tooltip/components/tooltip'

// Component
export const KbdTooltip = () => {
  // Template
  return (
    <div className='flex flex-wrap gap-4'>
      <ButtonGroup>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button size='sm' variant='outline'>
              Save
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <div className='flex items-center gap-2'>
              Save Changes <Kbd>S</Kbd>
            </div>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button size='sm' variant='outline'>
              Print
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <div className='flex items-center gap-2'>
              Print Document{' '}
              <KbdGroup>
                <Kbd>Ctrl</Kbd>
                <Kbd>P</Kbd>
              </KbdGroup>
            </div>
          </TooltipContent>
        </Tooltip>
      </ButtonGroup>
    </div>
  )
}
