import type { DropzoneOptions } from 'react-dropzone'
import {
  FileUpload,
  FileUploadContent,
  FileUploadInput,
  FileUploadItem,
  type FileUploadValue
} from '@/registry/new-york/molecules/file-upload/components/file-upload'
import FieldContainer, { type BaseSmartFormFieldFieldProps } from './field-container'
import { useFieldContext } from './lib/base'
import type { MultiFileFieldInputValue } from './lib/schema'

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
  const field = useFieldContext<MultiFileFieldInputValue>()
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

  // Template
  return (
    <FieldContainer errors={field.state.meta.errors} isInvalid={isInvalid} label={label} name={field.name} {...props}>
      <FileUpload
        dropzoneOptions={baseDropzoneOptions}
        isDisabled={isDisabled}
        onValueChange={field.handleChange}
        value={field.state.value}
      >
        <FileUploadInput aria-invalid={isInvalid} id={field.name} />

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
