import { Button } from '@/components/atoms/button'
import { Field } from '@/components/atoms/field'
import { Input } from '@/components/atoms/input'

export function InputInline() {
  return (
    <Field className='max-w-xs' orientation='horizontal'>
      <Input placeholder='Search...' type='search' />
      <Button>Search</Button>
    </Field>
  )
}
