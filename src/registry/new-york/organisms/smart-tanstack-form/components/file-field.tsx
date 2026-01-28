import {
  FileUpload,
  FileUploadContent,
  FileUploadInput,
  FileUploadItem,
  type FileUploadValue
} from '@/registry/new-york/molecules/file-upload/components/file-upload'
import FieldContainer, { type FieldProps } from './field-container'
import { useFieldContext } from './lib/base'

// Component
const FileField = ({ fieldData, disabledFields }: FieldProps) => {
  // Hooks
  const field = useFieldContext<FileUploadValue[number]>()
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

  // Template
  return (
    <FieldContainer fieldData={fieldData}>
      <FileUpload
        dropzoneOptions={fieldData.config?.dropzoneOptions}
        isDisabled={disabledFields?.[fieldData.code]}
        onValueChange={(files) => field.handleChange(files[0] ?? null)}
        value={field.state.value ? [field.state.value] : []}
      >
        <FileUploadInput aria-invalid={isInvalid} id={fieldData.code} />
        <FileUploadContent>
          {field.state.value && <FileUploadItem index={0} value={field.state.value} />}
        </FileUploadContent>
      </FileUpload>
    </FieldContainer>
  )
}

export default FileField
