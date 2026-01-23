import type { DropzoneOptions } from 'react-dropzone'
import {
  FileUpload,
  FileUploadContent,
  FileUploadInput,
  FileUploadItem,
  type FileUploadValue
} from '@/components/molecules/file-upload'
import FieldContainer, { type BaseSmartFormFieldFieldProps } from './field-container'
import { type MultiFileFieldOutputValue, useFieldContext } from './lib'

const baseDropzoneOptions: DropzoneOptions = {
  maxFiles: 10
}

// Component
const MultiFileField = ({
  label,
  isDisabled,
  dropzoneOptions = baseDropzoneOptions,
  ...props
}: BaseSmartFormFieldFieldProps & {
  dropzoneOptions?: DropzoneOptions
}) => {
  // Hooks
  const field = useFieldContext<MultiFileFieldOutputValue>()
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

  // Template
  return (
    <FieldContainer label={label} name={field.name} isInvalid={isInvalid} errors={field.state.meta.errors} {...props}>
      <FileUpload
        value={field.state.value}
        isDisabled={isDisabled}
        dropzoneOptions={baseDropzoneOptions}
        onValueChange={field.handleChange}
      >
        <FileUploadInput id={field.name} aria-invalid={isInvalid} />

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
