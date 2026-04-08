import { useState } from 'react'
import { Field, FieldDescription, FieldLabel } from '@/components/atoms/field'
import { ToggleGroup, ToggleGroupItem } from '@/components/atoms/toggle-group'

export function ToggleGroupFontWeightSelector() {
  const [fontWeight, setFontWeight] = useState('normal')

  return (
    <Field className='w-fit'>
      <FieldLabel>Font Weight</FieldLabel>
      <ToggleGroup
        onValueChange={(value) => setFontWeight(value[0])}
        size='lg'
        spacing={2}
        value={[fontWeight]}
        variant='outline'
      >
        <ToggleGroupItem
          aria-label='Light'
          className='flex size-16 flex-col items-center justify-center rounded-xl'
          value='light'
        >
          <span className='font-light text-2xl leading-none'>Aa</span>
          <span className='text-muted-foreground text-xs'>Light</span>
        </ToggleGroupItem>
        <ToggleGroupItem
          aria-label='Normal'
          className='flex size-16 flex-col items-center justify-center rounded-xl'
          value='normal'
        >
          <span className='font-normal text-2xl leading-none'>Aa</span>
          <span className='text-muted-foreground text-xs'>Normal</span>
        </ToggleGroupItem>
        <ToggleGroupItem
          aria-label='Medium'
          className='flex size-16 flex-col items-center justify-center rounded-xl'
          value='medium'
        >
          <span className='font-medium text-2xl leading-none'>Aa</span>
          <span className='text-muted-foreground text-xs'>Medium</span>
        </ToggleGroupItem>
        <ToggleGroupItem
          aria-label='Bold'
          className='flex size-16 flex-col items-center justify-center rounded-xl'
          value='bold'
        >
          <span className='font-bold text-2xl leading-none'>Aa</span>
          <span className='text-muted-foreground text-xs'>Bold</span>
        </ToggleGroupItem>
      </ToggleGroup>
      <FieldDescription>
        Use <code className='rounded-md bg-muted px-1 py-0.5 font-mono'>font-{fontWeight}</code> to set the font weight.
      </FieldDescription>
    </Field>
  )
}
