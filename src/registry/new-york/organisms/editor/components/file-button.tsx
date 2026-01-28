import { useForm } from '@tanstack/react-form'
import { useCurrentEditor } from '@tiptap/react'
import { CheckCircleIcon, PaperclipIcon } from 'lucide-react'
import { memo, useState } from 'react'
import type { DropzoneOptions } from 'react-dropzone'
import { toast } from 'sonner'
import z from 'zod'
import {
  FileUpload,
  FileUploadContent,
  FileUploadInput,
  FileUploadItem,
  type FileUploadProps
} from '@/registry/new-york/molecules/file-upload/components/file-upload'
import { getFileUrl, type UploadedFile, useFileUpload } from '@/registry/new-york/molecules/file-upload/components/lib'
import { Button } from '@/registry/new-york/ui/button/components/button'
import { Field, FieldError, FieldLabel } from '@/registry/new-york/ui/field/components/field'
import { Popover, PopoverContent, PopoverTrigger } from '@/registry/new-york/ui/popover/components/popover'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/registry/new-york/ui/tooltip/components/tooltip'

// File form schema
export const fileFormSchema = z.object({
  files: z.array(z.custom<File>()).min(1, 'Please select the file')
})

// Default file form value
export const defaultFileFormValue: z.input<typeof fileFormSchema> = {
  files: []
}

// File uploader dropzone options
export const fileUploaderDropzoneOptions: DropzoneOptions = {
  maxFiles: 10,
  multiple: true,
  accept: {
    'application/msword': ['.doc'],
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
    'application/xml': ['.xml'],
    'application/pdf': ['.pdf']
  }
}

// Component
const FileButton = memo<{
  id: string
}>(({ id }) => {
  // Hooks
  const { editor } = useCurrentEditor()
  const { isUploadFilePending, uploadFile } = useFileUpload()

  // States
  const [isOpenPopover, setIsOpenPopover] = useState(false)

  // Form
  const fileForm = useForm({
    formId: `${id}-file-form`,
    defaultValues: defaultFileFormValue,
    validators: {
      onSubmit: fileFormSchema
    },
    onSubmit: async ({ value }) => {
      try {
        const { files } = fileFormSchema.parse(value)

        // Upload file
        const uploadedFiles = (await Promise.all(files.map(async (file) => await uploadFile(file)))).filter(
          Boolean
        ) as UploadedFile[]

        // Add file node view
        for (const uploadedFile of uploadedFiles) {
          editor
            ?.chain()
            .focus()
            // @ts-expect-error - custom command from FileExtension
            .insertFile({
              url: getFileUrl(uploadedFile.path),
              name: uploadedFile.original,
              mime: uploadedFile.mime,
              size: uploadedFile.compress_info[''].size
            })
            .run()
        }

        // Enter new line
        if (uploadedFiles.length > 0) {
          editor?.commands.enter()
        }

        // Close popover
        setIsOpenPopover(false)
      } catch {
        toast.error('Failure', {
          description: 'An error occurred, please try again'
        })
      }
    }
  })

  // Template
  return (
    <Popover onOpenChange={setIsOpenPopover} open={isOpenPopover}>
      <Tooltip>
        <TooltipTrigger asChild>
          <PopoverTrigger asChild>
            <Button size='icon' variant='ghost'>
              <PaperclipIcon />
            </Button>
          </PopoverTrigger>
        </TooltipTrigger>

        <TooltipContent>File</TooltipContent>
      </Tooltip>

      <PopoverContent className='w-xs space-y-6' onCloseAutoFocus={() => fileForm.reset()}>
        <div>Acceptable formats: doc, docx, xlsx, xml, pdf</div>

        <form
          id={fileForm.formId}
          onSubmit={(e) => {
            e.preventDefault()
            fileForm.handleSubmit()
          }}
        >
          <fileForm.Field name='files'>
            {(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={`editor-${fileForm.formId}-files`}>Files *</FieldLabel>

                  <FileUpload
                    className='xl:grid-cols-1'
                    dropzoneOptions={fileUploaderDropzoneOptions}
                    onValueChange={field.handleChange as FileUploadProps['onValueChange']}
                    value={field.state.value}
                  >
                    <FileUploadInput aria-invalid={isInvalid} id={`editor-${fileForm.formId}-files`} />
                    <FileUploadContent>
                      {field.state.value.map((value, index) => (
                        <FileUploadItem
                          index={index}
                          // biome-ignore lint/suspicious/noArrayIndexKey: ignore
                          key={index}
                          value={value}
                        />
                      ))}
                    </FileUploadContent>
                  </FileUpload>

                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              )
            }}
          </fileForm.Field>
        </form>

        <div className='flex items-center justify-end gap-1'>
          <fileForm.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
            {([canSubmit, isSubmitting]) => (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    disabled={!canSubmit}
                    form={fileForm.formId}
                    isLoading={isUploadFilePending || isSubmitting}
                    size='icon'
                    type='submit'
                    variant='outline'
                  >
                    <CheckCircleIcon />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>submitButton</TooltipContent>
              </Tooltip>
            )}
          </fileForm.Subscribe>
        </div>
      </PopoverContent>
    </Popover>
  )
})

FileButton.displayName = 'FileButton'
export default FileButton
