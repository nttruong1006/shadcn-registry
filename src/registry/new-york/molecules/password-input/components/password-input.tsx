import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import type { InputProps } from '@/components/atoms/input'
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '@/components/atoms/input-group'

export type PasswordInputProps = InputProps

export function PasswordInput({ className, ...props }: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <InputGroup>
      <InputGroupInput {...props} type={showPassword ? 'text' : 'password'} />
      <InputGroupAddon align='inline-end'>
        <InputGroupButton onClick={() => setShowPassword((prev) => !prev)} size='icon-xs'>
          {showPassword ? <EyeOff /> : <Eye />}
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  )
}
