import { Editor } from '@/components/organisms/editor/editor'
import SmartFormFieldContainer from './field-container'
import type { BaseSmartFormFieldComponentProps } from './lib/base'
import { useFieldContext } from './lib/form'
import type { EditorFieldInputValue } from './lib/schemas/editor'

export default function EditorField({ label, disabled, ...props }: BaseSmartFormFieldComponentProps) {
  const field = useFieldContext<EditorFieldInputValue>()
  const invalid = field.state.meta.isTouched && !field.state.meta.isValid

  return (
    <SmartFormFieldContainer
      errors={field.state.meta.errors}
      invalid={invalid}
      label={label}
      name={field.name}
      {...props}
    >
      <Editor
        id={`${field.form.formId}-${field.name}`}
        onValueChange={(value) => field.handleChange(value?.toString() ?? '')}
        placeholder={`Enter ${typeof label === 'string' ? label.toLowerCase() : 'information'}`}
        value={field.state.value}
      />
    </SmartFormFieldContainer>
  )
}
