import { Editor, type EditorProps } from '@/components/organisms/editor/editor'
import FieldContainer, { type BaseSmartFormFieldFieldProps } from './field-container'
import { useFieldContext } from './lib/form'
import type { EditorFieldInputValue } from './lib/schema'

export default function EditorField({ label, disabled, ...props }: BaseSmartFormFieldFieldProps) {
  const field = useFieldContext<EditorFieldInputValue>()
  const invalid = field.state.meta.isTouched && !field.state.meta.isValid

  return (
    <FieldContainer errors={field.state.meta.errors} invalid={invalid} label={label} name={field.name} {...props}>
      <Editor
        editable={!disabled}
        id={`${field.form.formId}-${field.name}`}
        onValueChange={field.handleChange as EditorProps['onValueChange']}
        placeholder={`Enter ${typeof label === 'string' ? label.toLowerCase() : 'information'}`}
        value={field.state.value}
      />
    </FieldContainer>
  )
}
