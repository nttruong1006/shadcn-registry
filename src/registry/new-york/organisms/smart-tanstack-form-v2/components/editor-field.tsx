import { Editor, type EditorProps } from '@/components/organisms/editor'
import FieldContainer, { type BaseSmartFormFieldFieldProps } from './field-container'
import { type EditorFieldOutputValue, useFieldContext } from './lib'

// Component
const EditorField = ({ label, isDisabled, ...props }: BaseSmartFormFieldFieldProps) => {
  // Hooks
  const field = useFieldContext<EditorFieldOutputValue>()
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

  // Template
  return (
    <FieldContainer label={label} name={field.name} isInvalid={isInvalid} errors={field.state.meta.errors} {...props}>
      <Editor
        value={field.state.value}
        editable={!isDisabled}
        onValueChange={field.handleChange as EditorProps['onValueChange']}
      />
    </FieldContainer>
  )
}

export default EditorField
