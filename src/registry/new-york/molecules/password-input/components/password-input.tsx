import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import type { InputProps } from '@/registry/new-york/ui/input/components/input'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput
} from '@/registry/new-york/ui/input-group/components/input-group'

// Password input
export type PasswordInputProps = InputProps
export const PasswordInput = ({ className, ...props }: PasswordInputProps) => {
  // States
  const [passwordVisibility, setPasswordVisibility] = useState(false)

  // Template
  return (
    <InputGroup>
      <InputGroupInput {...props} type={passwordVisibility ? 'text' : 'password'} />
      <InputGroupAddon align='inline-end'>
        <InputGroupButton onClick={() => setPasswordVisibility((prev) => !prev)} size='icon-xs'>
          {passwordVisibility ? <EyeOff /> : <Eye />}
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  )
}
