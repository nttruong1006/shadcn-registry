import { ChevronDownIcon, GlobeIcon } from 'lucide-react'
import { type InputHTMLAttributes, useMemo } from 'react'
import RPNInput, { type Country, type FlagProps, getCountryCallingCode, type Props } from 'react-phone-number-input'
import flags from 'react-phone-number-input/flags'
import { Button } from '@/components/atoms/button'
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger,
  ComboboxValue
} from '@/components/atoms/combobox'
import { Input, type InputProps } from '@/components/atoms/input'
import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from '@/components/atoms/item'
import type { Option } from '@/types/base'
import { cn } from '@/utils/ui'

function FlagComponent({ country, countryName }: FlagProps) {
  const Flag = flags[country]

  return (
    <div className='flex h-4 w-6 overflow-hidden rounded-sm [&_svg]:size-full!'>
      {Flag && <Flag title={countryName} />}
    </div>
  )
}

function CountrySelectComponent({
  disabled,
  value,
  options,
  onChange
}: {
  disabled?: boolean
  value: Country | undefined
  options: Option<Country | undefined>[]
  onChange: (value: Country | undefined) => void
}) {
  const items = useMemo(() => options.filter((option) => !!option.value), [options])

  const comboboxValue = useMemo(
    () => options.find((option) => option.value && option.value === value) ?? null,
    [options, value]
  )

  return (
    <Combobox disabled={disabled} items={items} onValueChange={(value) => onChange(value?.value)} value={comboboxValue}>
      <ComboboxTrigger
        disabled={disabled}
        render={
          <Button className='w-[72px] justify-between rounded-r-none' variant='outline'>
            <ComboboxValue>
              {(value: Option<Country>) => {
                if (value) {
                  return <FlagComponent country={value.value} countryName={value.label} />
                }
                return <GlobeIcon />
              }}
            </ComboboxValue>
            <ChevronDownIcon className='pointer-events-none size-4 text-muted-foreground' />
          </Button>
        }
      />
      <ComboboxContent className='w-fit'>
        <ComboboxInput placeholder='Search country' showTrigger={false} />
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(option: Option<Country>) => (
            <ComboboxItem key={option.value} value={option}>
              <Item className='p-0' size='xs'>
                <ItemMedia variant='icon'>
                  <FlagComponent country={option.value} countryName={option.label} />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle className='whitespace-nowrap'>{option.label}</ItemTitle>
                </ItemContent>
                <ItemContent>
                  <ItemDescription>{`+${getCountryCallingCode(option.value)}`}</ItemDescription>
                </ItemContent>
              </Item>
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}

function InputComponent({ className, ...props }: InputProps) {
  return <Input className={cn('z-10 rounded-s-none', className)} {...props} />
}

export type PhoneNumberInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> &
  Omit<Props<typeof RPNInput>, 'onChange'> & {
    onValueChange: (value: string) => void
  }

export function PhoneNumberInput({ className, onValueChange, ...props }: PhoneNumberInputProps) {
  return (
    <RPNInput
      className={cn('flex', className)}
      countrySelectComponent={CountrySelectComponent}
      flagComponent={FlagComponent}
      inputComponent={InputComponent}
      international
      smartCaret={false}
      {...props}
      onChange={(value) => onValueChange(value ?? '')}
    />
  )
}
