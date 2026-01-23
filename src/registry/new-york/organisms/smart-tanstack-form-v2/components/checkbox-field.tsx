import { Checkbox } from '@/components/ui/checkbox'
import FieldContainer, { type BaseSmartFormFieldFieldProps } from './field-container'
import { type CheckboxFieldOutputValue, useFieldContext } from './lib'

// Component
const CheckboxField = ({ label, isDisabled, ...props }: BaseSmartFormFieldFieldProps) => {
  // Hooks
  const field = useFieldContext<CheckboxFieldOutputValue>()

  // Template
  return (
    <FieldContainer
      label={label}
      name={field.name}
      errors={field.state.meta.errors}
      className='flex-row-reverse'
      orientation='horizontal'
      {...props}
    >
      <Checkbox
        id={field.name}
        name={field.name}
        checked={field.state.value}
        disabled={isDisabled}
        onCheckedChange={(checked) => field.handleChange(checked === true)}
      />
    </FieldContainer>
  )
}

export default CheckboxField
