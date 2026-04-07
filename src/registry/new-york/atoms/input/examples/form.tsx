import { Button } from '@/components/atoms/button'
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/components/atoms/field'
import { Input } from '@/components/atoms/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/atoms/select'

export function InputForm() {
  const countries = [
    { label: 'United States', value: 'us' },
    { label: 'United Kingdom', value: 'uk' },
    { label: 'Canada', value: 'ca' }
  ]
  return (
    <form className='w-full max-w-sm'>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor='form-name'>Name</FieldLabel>
          <Input id='form-name' placeholder='Evil Rabbit' required type='text' />
        </Field>
        <Field>
          <FieldLabel htmlFor='form-email'>Email</FieldLabel>
          <Input id='form-email' placeholder='john@example.com' type='email' />
          <FieldDescription>We&apos;ll never share your email with anyone.</FieldDescription>
        </Field>
        <div className='grid grid-cols-2 gap-4'>
          <Field>
            <FieldLabel htmlFor='form-phone'>Phone</FieldLabel>
            <Input id='form-phone' placeholder='+1 (555) 123-4567' type='tel' />
          </Field>
          <Field>
            <FieldLabel htmlFor='form-country'>Country</FieldLabel>
            <Select defaultValue='us' items={countries}>
              <SelectTrigger id='form-country'>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {countries.map((country) => (
                    <SelectItem key={country.value} value={country.value}>
                      {country.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>
        </div>
        <Field>
          <FieldLabel htmlFor='form-address'>Address</FieldLabel>
          <Input id='form-address' placeholder='123 Main St' type='text' />
        </Field>
        <Field orientation='horizontal'>
          <Button type='button' variant='outline'>
            Cancel
          </Button>
          <Button type='submit'>Submit</Button>
        </Field>
      </FieldGroup>
    </form>
  )
}
