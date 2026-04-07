import { ArrowRightIcon } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/atoms/button'
import { ButtonGroup } from '@/components/atoms/button-group'
import { Input } from '@/components/atoms/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger } from '@/components/atoms/select'

const CURRENCIES = [
  { label: 'US Dollar', value: '$' },
  { label: 'Euro', value: '€' },
  { label: 'British Pound', value: '£' }
]

export function ButtonGroupSelect() {
  const [currency, setCurrency] = useState('$')

  return (
    <ButtonGroup>
      <ButtonGroup>
        <Select items={CURRENCIES} onValueChange={(value) => setCurrency(value as string)} value={currency}>
          <SelectTrigger className='font-mono'>{currency}</SelectTrigger>
          <SelectContent align='start' alignItemWithTrigger={false}>
            <SelectGroup>
              {CURRENCIES.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.value} <span className='text-muted-foreground'>{item.label}</span>
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Input pattern='[0-9]*' placeholder='10.00' />
      </ButtonGroup>
      <ButtonGroup>
        <Button aria-label='Send' size='icon' variant='outline'>
          <ArrowRightIcon />
        </Button>
      </ButtonGroup>
    </ButtonGroup>
  )
}
