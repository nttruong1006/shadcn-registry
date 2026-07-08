import { BellIcon, MailIcon, MessageSquareIcon } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/atoms/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/atoms/dropdown-menu'

export function DropdownMenuCheckboxesIcons() {
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false
  })

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant='outline'>Notifications</Button>} />
      <DropdownMenuContent className='w-48'>
        <DropdownMenuGroup>
          <DropdownMenuLabel>Notification Preferences</DropdownMenuLabel>
          <DropdownMenuCheckboxItem
            checked={notifications.email}
            onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked === true })}
          >
            <MailIcon />
            Email notifications
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={notifications.sms}
            onCheckedChange={(checked) => setNotifications({ ...notifications, sms: checked === true })}
          >
            <MessageSquareIcon />
            SMS notifications
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={notifications.push}
            onCheckedChange={(checked) => setNotifications({ ...notifications, push: checked === true })}
          >
            <BellIcon />
            Push notifications
          </DropdownMenuCheckboxItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
