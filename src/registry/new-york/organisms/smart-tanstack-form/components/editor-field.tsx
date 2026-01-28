import type { Content } from '@tiptap/react'
import { Editor } from '@/registry/new-york/organisms/editor/components/editor'
import FieldContainer, { type FieldProps } from './field-container'
import { useFieldContext } from './lib/base'

// Component
const EditorField = ({ fieldData, disabledFields }: FieldProps) => {
  // Hooks
  const field = useFieldContext<Content>()

  // Template
  return (
    <FieldContainer fieldData={fieldData}>
      <Editor
        editable={!disabledFields?.[fieldData.code]}
        onValueChange={field.handleChange}
        value={field.state.value}
      />
    </FieldContainer>
  )
}

export default EditorField
