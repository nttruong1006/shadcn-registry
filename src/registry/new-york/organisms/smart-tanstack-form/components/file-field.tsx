import {
  FileUpload,
  FileUploadContent,
  FileUploadInput,
  FileUploadItem,
  type FileUploadValue
} from '@/components/molecules/file-upload'
import FieldContainer, { type FieldProps } from './field-container'
import { useFieldContext } from './lib'

// Component
const FileField = ({ fieldData, disabledFields }: FieldProps) => {
  // Hooks
  const field = useFieldContext<FileUploadValue[number]>()
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

  // Template
  return (
    <FieldContainer fieldData={fieldData}>
      <FileUpload
        value={field.state.value ? [field.state.value] : []}
        dropzoneOptions={fieldData.config?.dropzoneOptions}
        isDisabled={disabledFields?.[fieldData.code]}
        onValueChange={(files) => field.handleChange(files[0] ?? null)}
      >
        <FileUploadInput id={fieldData.code} aria-invalid={isInvalid} />
        <FileUploadContent>
          {field.state.value && <FileUploadItem value={field.state.value} index={0} />}
        </FileUploadContent>
      </FileUpload>
    </FieldContainer>
  )
}

export default FileField
