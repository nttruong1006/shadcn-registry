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
const MultiFileField = ({ fieldData, disabledFields }: FieldProps) => {
  // Hooks
  const field = useFieldContext<FileUploadValue>()
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

  // Template
  return (
    <FieldContainer fieldData={fieldData}>
      <FileUpload
        value={field.state.value}
        dropzoneOptions={fieldData.config?.dropzoneOptions}
        isDisabled={disabledFields?.[fieldData.code]}
        onValueChange={field.handleChange}
      >
        <FileUploadInput id={fieldData.code} aria-invalid={isInvalid} />

        <FileUploadContent>
          {(field.state.value as FileUploadValue).map((value, index) => (
            <FileUploadItem
              // biome-ignore lint/suspicious/noArrayIndexKey: ignore
              key={index}
              index={index}
              value={value}
            />
          ))}
        </FileUploadContent>
      </FileUpload>
    </FieldContainer>
  )
}

export default MultiFileField
