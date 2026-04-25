import type { DropzoneOptions } from 'react-dropzone'
import {
  FileUpload,
  FileUploadContent,
  FileUploadInput,
  FileUploadItem,
  type FileUploadValue
} from '@/components/molecules/file-upload/file-upload'
import FieldContainer, { type BaseSmartFormFieldFieldProps } from './field-container'
import { useFieldContext } from './lib/form'
import type { MultiFileFieldInputValue } from './lib/schema'

const baseDropzoneOptions: DropzoneOptions = {
  maxFiles: 10
}

export default function MultiFileField({
  label,
  disabled,
  dropzoneOptions = baseDropzoneOptions,
  ...props
}: BaseSmartFormFieldFieldProps & {
  dropzoneOptions?: DropzoneOptions
}) {
  const field = useFieldContext<MultiFileFieldInputValue>()
  const invalid = field.state.meta.isTouched && !field.state.meta.isValid

  return (
    <FieldContainer errors={field.state.meta.errors} invalid={invalid} label={label} name={field.name} {...props}>
      <FileUpload
        disabled={disabled}
        onValueChange={field.handleChange}
        value={field.state.value}
        {...baseDropzoneOptions}
      >
        <FileUploadInput aria-invalid={invalid} id={`${field.form.formId}-${field.name}`} />
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
