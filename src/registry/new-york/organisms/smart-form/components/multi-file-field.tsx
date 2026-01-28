import {
  FileUpload,
  FileUploadContent,
  FileUploadInput,
  FileUploadItem,
  type FileUploadValue
} from '@/registry/new-york/molecules/file-upload/components/file-upload'
import FieldContainer, { type FieldProps } from './field-container'

// Component
const MultiFileField = ({ fieldData, disabledFields }: FieldProps) => {
  // Template
  return (
    <FieldContainer disabledFields={disabledFields} fieldData={fieldData}>
      {({ field, fieldState }) => (
        <FileUpload
          dropzoneOptions={fieldData.config?.dropzoneOptions}
          isDisabled={disabledFields?.[fieldData.code]}
          onValueChange={field.onChange}
          value={field.value}
        >
          <FileUploadInput aria-invalid={fieldState.invalid} id={fieldData.code} />

          <FileUploadContent>
            {(field.value as FileUploadValue).map((value, index) => (
              <FileUploadItem
                index={index}
                // biome-ignore lint/suspicious/noArrayIndexKey: ignore
                key={index}
                value={value}
              />
            ))}
          </FileUploadContent>
        </FileUpload>
      )}
    </FieldContainer>
  )
}

export default MultiFileField
