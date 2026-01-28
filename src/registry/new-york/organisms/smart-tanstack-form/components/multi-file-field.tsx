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
const MultiFileField = ({ fieldData, disabledFields }: FieldProps) => {
  // Hooks
  const field = useFieldContext<FileUploadValue>()
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

  // Template
  return (
    <FieldContainer fieldData={fieldData}>
      <FileUpload
        dropzoneOptions={fieldData.config?.dropzoneOptions}
        isDisabled={disabledFields?.[fieldData.code]}
        onValueChange={field.handleChange}
        value={field.state.value}
      >
        <FileUploadInput aria-invalid={isInvalid} id={fieldData.code} />

        <FileUploadContent>
          {(field.state.value as FileUploadValue).map((value, index) => (
            <FileUploadItem
              index={index}
              // biome-ignore lint/suspicious/noArrayIndexKey: ignore
              key={index}
              value={value}
            />
          ))}
        </FileUploadContent>
      </FileUpload>
    </FieldContainer>
  )
}

export default MultiFileField
