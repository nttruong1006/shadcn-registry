import { Editor } from '@/registry/new-york/organisms/editor/components/editor'
import FieldContainer, { type FieldProps } from './field-container'

// Component
const EditorField = ({ fieldData, disabledFields }: FieldProps) => {
  // Template
  return (
    <FieldContainer disabledFields={disabledFields} fieldData={fieldData}>
      {({ field }) => (
        <Editor editable={!disabledFields?.[fieldData.code]} onValueChange={field.onChange} value={field.value} />
      )}
    </FieldContainer>
  )
}

export default EditorField
