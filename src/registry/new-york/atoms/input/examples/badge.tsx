import { Badge } from '@/components/atoms/badge'
import { Field, FieldLabel } from '@/components/atoms/field'
import { Input } from '@/components/atoms/input'

export function InputBadge() {
  return (
    <Field className='max-w-xs'>
      <FieldLabel htmlFor='input-badge'>
        Webhook URL{' '}
        <Badge className='ml-auto' variant='secondary'>
          Beta
        </Badge>
      </FieldLabel>
      <Input id='input-badge' placeholder='https://api.example.com/webhook' type='url' />
    </Field>
  )
}
