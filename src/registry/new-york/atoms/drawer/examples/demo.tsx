import { useState } from 'react'
import { toast } from 'sonner'
import { Badge } from '@/components/atoms/badge'
import { Button } from '@/components/atoms/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '@/components/atoms/drawer'
import { Field, FieldContent, FieldDescription, FieldLabel, FieldTitle } from '@/components/atoms/field'
import { RadioGroup, RadioGroupItem } from '@/components/atoms/radio-group'
import { useIsMobile } from '@/hooks/use-device'

const deliveryTimes = [
  {
    badge: 'Fastest',
    description: '25-35 min · Driver assigned now',
    id: 'delivery-asap',
    label: 'Standard delivery',
    value: 'asap'
  },
  {
    description: 'Prep starts at 4:45 PM',
    id: 'delivery-5-00',
    label: '5:00 PM - 5:15 PM',
    value: '5-00'
  },
  {
    description: "Good if you're heading home",
    id: 'delivery-5-30',
    label: '5:30 PM - 5:45 PM',
    value: '5-30'
  },
  {
    description: 'Most popular · High demand',
    id: 'delivery-6-00',
    label: '6:00 PM - 6:15 PM',
    value: '6-00'
  },
  {
    description: 'Last slot before kitchen closes',
    id: 'delivery-6-30',
    label: '6:30 PM - 6:45 PM',
    value: '6-30'
  }
]

export function DrawerDemo() {
  const [open, setOpen] = useState(false)
  const [deliveryTime, setDeliveryTime] = useState('asap')
  const isMobile = useIsMobile()

  function handleConfirm() {
    const selected = deliveryTimes.find((time) => time.value === deliveryTime)

    if (!selected) {
      return
    }

    setOpen(false)
    toast('Delivery time confirmed', {
      description: selected.label
    })
  }

  return (
    <Drawer onOpenChange={setOpen} open={open} showSwipeHandle={isMobile} swipeDirection={isMobile ? 'down' : 'right'}>
      <DrawerTrigger render={<Button>Open Drawer</Button>} />
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Pick a delivery time</DrawerTitle>
          <DrawerDescription>We&apos;ll prepare your order as soon as possible.</DrawerDescription>
        </DrawerHeader>
        <div className='scroll-fade flex-1 overflow-y-auto p-4'>
          <RadioGroup className='gap-2' onValueChange={setDeliveryTime} value={deliveryTime}>
            {deliveryTimes.map((time) => (
              <FieldLabel htmlFor={time.id} key={time.value}>
                <Field orientation='horizontal'>
                  <FieldContent>
                    <FieldTitle className='flex items-center gap-2'>
                      {time.label}
                      {time.badge ? <Badge variant='secondary'>{time.badge}</Badge> : null}
                    </FieldTitle>
                    <FieldDescription>{time.description}</FieldDescription>
                  </FieldContent>
                  <RadioGroupItem id={time.id} value={time.value} />
                </Field>
              </FieldLabel>
            ))}
          </RadioGroup>
        </div>
        <DrawerFooter>
          <Button onClick={handleConfirm}>Confirm Delivery Time</Button>
          <DrawerClose render={<Button variant='outline'>Cancel</Button>} />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
