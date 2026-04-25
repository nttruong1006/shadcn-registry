import {
  FileUpload,
  FileUploadContent,
  FileUploadInput,
  FileUploadItem,
  type FileUploadProps
} from '@/components/molecules/file-upload/file-upload'
import FieldContainer, { type BaseSmartFormFieldFieldProps } from './field-container'
import { useFieldContext } from './lib/form'
import type { FileFieldInputValue } from './lib/schema'

type FileFieldProps = BaseSmartFormFieldFieldProps & {
  fileUploadProps: Partial<FileUploadProps>
}

export default function FileField({ label, disabled, fileUploadProps, ...props }: FileFieldProps) {
  const field = useFieldContext<FileFieldInputValue>()
  const invalid = field.state.meta.isTouched && !field.state.meta.isValid

  return (
    <FieldContainer errors={field.state.meta.errors} invalid={invalid} label={label} name={field.name} {...props}>
      <FileUpload
        disabled={disabled}
        onValueChange={(files) => field.handleChange(files[0] ?? null)}
        value={field.state.value ? [field.state.value] : []}
        {...fileUploadProps}
      >
        <FileUploadInput aria-invalid={invalid} id={`${field.form.formId}-${field.name}`} />
        <FileUploadContent>
          {field.state.value && <FileUploadItem index={0} value={field.state.value} />}
        </FileUploadContent>
      </FileUpload>
    </FieldContainer>
  )
}
