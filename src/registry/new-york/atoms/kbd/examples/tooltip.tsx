import { Button } from '@/components/atoms/button'
import { ButtonGroup } from '@/components/atoms/button-group'
import { Kbd, KbdGroup } from '@/components/atoms/kbd'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/atoms/tooltip'

export function KbdTooltip() {
  return (
    <div className='flex flex-wrap gap-4'>
      <ButtonGroup>
        <Tooltip>
          <TooltipTrigger render={<Button variant='outline'>Save</Button>} />
          <TooltipContent>
            Save Changes <Kbd>S</Kbd>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger render={<Button variant='outline'>Print</Button>} />
          <TooltipContent>
            Print Document{' '}
            <KbdGroup>
              <Kbd>Ctrl</Kbd>
              <Kbd>P</Kbd>
            </KbdGroup>
          </TooltipContent>
        </Tooltip>
      </ButtonGroup>
    </div>
  )
}
