import { Button } from '@/components/atoms/button'
import { Textarea } from '@/components/atoms/textarea'

export function TextareaButton() {
  return (
    <div className='grid w-full gap-2'>
      <Textarea placeholder='Type your message here.' />
      <Button>Send message</Button>
    </div>
  )
}
