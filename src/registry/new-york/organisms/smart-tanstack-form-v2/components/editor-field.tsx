import { Editor, type EditorProps } from '@/registry/new-york/organisms/editor/components/editor'
import FieldContainer, { type BaseSmartFormFieldFieldProps } from './field-container'
import { useFieldContext } from './lib/base'
import type { EditorFieldOutputValue } from './lib/schema'

// Component
const EditorField = ({ label, isDisabled, ...props }: BaseSmartFormFieldFieldProps) => {
  // Hooks
  const field = useFieldContext<EditorFieldOutputValue>()
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

  // Template
  return (
    <FieldContainer errors={field.state.meta.errors} isInvalid={isInvalid} label={label} name={field.name} {...props}>
      <Editor
        editable={!isDisabled}
        onValueChange={field.handleChange as EditorProps['onValueChange']}
        value={field.state.value}
      />
    </FieldContainer>
  )
}

export default EditorField
