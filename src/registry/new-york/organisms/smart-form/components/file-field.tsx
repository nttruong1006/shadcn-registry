import {
  FileUpload,
  FileUploadContent,
  FileUploadInput,
  FileUploadItem,
  type FileUploadProps
} from '@/components/molecules/file-upload/file-upload'
import SmartFormFieldContainer from './field-container'
import type { BaseSmartFormFieldComponentProps } from './lib/base'
import { useFieldContext } from './lib/form'
import type { FileFieldInputValue } from './lib/schemas/file'

type FileFieldProps = BaseSmartFormFieldComponentProps & {
  fileUploadProps: Partial<FileUploadProps>
}

export default function FileField({ label, disabled, fileUploadProps, ...props }: FileFieldProps) {
  const field = useFieldContext<FileFieldInputValue>()
  const invalid = field.state.meta.isTouched && !field.state.meta.isValid

  return (
    <SmartFormFieldContainer
      errors={field.state.meta.errors}
      invalid={invalid}
      label={label}
      name={field.name}
      {...props}
    >
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
    </SmartFormFieldContainer>
  )
}
