import type { Content } from '@tiptap/react'
import { Editor } from '@/components/organisms/editor'
import FieldContainer, { type FieldProps } from './field-container'
import { useFieldContext } from './lib'

// Component
const EditorField = ({ fieldData, disabledFields }: FieldProps) => {
  // Hooks
  const field = useFieldContext<Content>()

  // Template
  return (
    <FieldContainer fieldData={fieldData}>
      <Editor
        value={field.state.value}
        editable={!disabledFields?.[fieldData.code]}
        onValueChange={field.handleChange}
      />
    </FieldContainer>
  )
}

export default EditorField
