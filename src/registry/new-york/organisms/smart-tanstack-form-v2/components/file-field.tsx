import {
  FileUpload,
  FileUploadContent,
  FileUploadInput,
  FileUploadItem,
  type FileUploadProps
} from '@/components/molecules/file-upload'
import FieldContainer, { type BaseSmartFormFieldFieldProps } from './field-container'
import { type FileFieldOutputValue, useFieldContext } from './lib'

// Component
const FileField = ({
  label,
  isDisabled,
  fileUploadProps,
  ...props
}: BaseSmartFormFieldFieldProps & {
  fileUploadProps: Partial<FileUploadProps>
}) => {
  // Hooks
  const field = useFieldContext<FileFieldOutputValue>()
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

  // Template
  return (
    <FieldContainer label={label} name={field.name} isInvalid={isInvalid} errors={field.state.meta.errors} {...props}>
      <FileUpload
        value={field.state.value ? [field.state.value] : []}
        isDisabled={isDisabled}
        onValueChange={(files) => field.handleChange(files[0] ?? null)}
        {...fileUploadProps}
      >
        <FileUploadInput id={field.name} aria-invalid={isInvalid} />
        <FileUploadContent>
          {field.state.value && <FileUploadItem value={field.state.value} index={0} />}
        </FileUploadContent>
      </FileUpload>
    </FieldContainer>
  )
}

export default FileField
