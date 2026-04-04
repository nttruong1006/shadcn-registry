import { ArrowRightIcon } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/atoms/button'
import { ButtonGroup } from '@/components/atoms/button-group'
import { Input } from '@/components/atoms/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger } from '@/components/atoms/select'

const CURRENCIES = [
  {
    value: '$',
    label: 'US Dollar'
  },
  {
    value: '€',
    label: 'Euro'
  },
  {
    value: '£',
    label: 'British Pound'
  }
]

// Component
export function ButtonGroupSelect() {
  // States
  const [currency, setCurrency] = useState('$')

  // Template
  return (
    <ButtonGroup>
      <ButtonGroup>
        <Select onValueChange={setCurrency} value={currency}>
          <SelectTrigger className='font-mono'>{currency}</SelectTrigger>
          <SelectContent className='min-w-24'>
            <SelectGroup>
              {CURRENCIES.map((currency) => (
                <SelectItem key={currency.value} value={currency.value}>
                  {currency.value} <span className='text-muted-foreground'>{currency.label}</span>
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
