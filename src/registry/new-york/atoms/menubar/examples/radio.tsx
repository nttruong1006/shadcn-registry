import { useState } from 'react'
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarTrigger
} from '@/components/atoms/menubar'

export function MenubarRadio() {
  const [user, setUser] = useState('benoit')
  const [theme, setTheme] = useState('system')

  return (
    <Menubar className='w-72'>
      <MenubarMenu>
        <MenubarTrigger>Profiles</MenubarTrigger>
        <MenubarContent>
          <MenubarRadioGroup onValueChange={setUser} value={user}>
            <MenubarRadioItem value='andy'>Andy</MenubarRadioItem>
            <MenubarRadioItem value='benoit'>Benoit</MenubarRadioItem>
            <MenubarRadioItem value='luis'>Luis</MenubarRadioItem>
          </MenubarRadioGroup>
          <MenubarSeparator />
          <MenubarItem inset>Edit...</MenubarItem>
          <MenubarItem inset>Add Profile...</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Theme</MenubarTrigger>
        <MenubarContent>
          <MenubarRadioGroup onValueChange={setTheme} value={theme}>
            <MenubarRadioItem value='light'>Light</MenubarRadioItem>
            <MenubarRadioItem value='dark'>Dark</MenubarRadioItem>
            <MenubarRadioItem value='system'>System</MenubarRadioItem>
          </MenubarRadioGroup>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}
