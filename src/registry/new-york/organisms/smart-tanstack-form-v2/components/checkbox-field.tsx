import { Checkbox } from '@/registry/new-york/ui/checkbox/components/checkbox'
import FieldContainer, { type BaseSmartFormFieldFieldProps } from './field-container'
import { useFieldContext } from './lib/base'
import type { CheckboxFieldOutputValue } from './lib/schema'

// Component
const CheckboxField = ({ label, isDisabled, ...props }: BaseSmartFormFieldFieldProps) => {
  // Hooks
  const field = useFieldContext<CheckboxFieldOutputValue>()

  // Template
  return (
    <FieldContainer
      className='flex-row-reverse'
      errors={field.state.meta.errors}
      label={label}
      name={field.name}
      orientation='horizontal'
      {...props}
    >
      <Checkbox
        checked={field.state.value}
        disabled={isDisabled}
        id={field.name}
        name={field.name}
        onCheckedChange={(checked) => field.handleChange(checked === true)}
      />
    </FieldContainer>
  )
}

export default CheckboxField
