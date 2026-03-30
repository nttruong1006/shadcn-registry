import {
  FileUpload,
  FileUploadContent,
  FileUploadInput,
  FileUploadItem,
  type FileUploadProps
} from '@/registry/new-york/molecules/file-upload/components/file-upload'
import FieldContainer, { type BaseSmartFormFieldFieldProps } from './field-container'
import { useFieldContext } from './lib/base'
import type { FileFieldInputValue } from './lib/schema'

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
  const field = useFieldContext<FileFieldInputValue>()
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

  // Template
  return (
    <FieldContainer errors={field.state.meta.errors} isInvalid={isInvalid} label={label} name={field.name} {...props}>
      <FileUpload
        isDisabled={isDisabled}
        onValueChange={(files) => field.handleChange(files[0] ?? null)}
        value={field.state.value ? [field.state.value] : []}
        {...fileUploadProps}
      >
        <FileUploadInput aria-invalid={isInvalid} id={field.name} />
        <FileUploadContent>
          {field.state.value && <FileUploadItem index={0} value={field.state.value} />}
        </FileUploadContent>
      </FileUpload>
    </FieldContainer>
  )
}

export default FileField
