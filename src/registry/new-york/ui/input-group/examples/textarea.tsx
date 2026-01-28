import { Code, Copy, CornerDownLeft, RefreshCcw } from 'lucide-react'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupTextarea
} from '@/registry/new-york/ui/input-group/components/input-group'

// Component
export const InputGroupTextareaExample = () => {
  // Template
  return (
    <div className='grid w-full max-w-md gap-4'>
      <InputGroup>
        <InputGroupTextarea
          className='min-h-[200px]'
          id='textarea-code-32'
          placeholder="console.log('Hello, world!');"
        />
        <InputGroupAddon align='block-end' className='border-t'>
          <InputGroupText>Line 1, Column 1</InputGroupText>
          <InputGroupButton className='ml-auto' size='sm' variant='default'>
            Run <CornerDownLeft />
          </InputGroupButton>
        </InputGroupAddon>
        <InputGroupAddon align='block-start' className='border-b'>
          <InputGroupText className='font-medium font-mono'>
            <Code />
            script.js
          </InputGroupText>
          <InputGroupButton className='ml-auto' size='icon-xs'>
            <RefreshCcw />
          </InputGroupButton>
          <InputGroupButton size='icon-xs' variant='ghost'>
            <Copy />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}
