import {
  FileUpload,
  FileUploadContent,
  FileUploadInput,
  FileUploadItem
} from '@/registry/new-york/molecules/file-upload/components/file-upload'
import FieldContainer, { type FieldProps } from './field-container'

// Component
const FileField = ({ fieldData, disabledFields }: FieldProps) => {
  // Template
  return (
    <FieldContainer disabledFields={disabledFields} fieldData={fieldData}>
      {({ field, fieldState }) => (
        <FileUpload
          dropzoneOptions={fieldData.config?.dropzoneOptions}
          isDisabled={disabledFields?.[fieldData.code]}
          onValueChange={(files) => field.onChange(files[0] ?? null)}
          value={field.value ? [field.value] : []}
        >
          <FileUploadInput aria-invalid={fieldState.invalid} id={fieldData.code} />

          <FileUploadContent>{field.value && <FileUploadItem index={0} value={field.value} />}</FileUploadContent>
        </FileUpload>
      )}
    </FieldContainer>
  )
}

export default FileField
