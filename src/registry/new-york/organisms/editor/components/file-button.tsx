import { useForm } from '@tanstack/react-form'
import { useCurrentEditor } from '@tiptap/react'
import { CheckCircleIcon, PaperclipIcon } from 'lucide-react'
import { useState } from 'react'
import type { DropzoneOptions } from 'react-dropzone'
import { toast } from 'sonner'
import z from 'zod'
import { Button } from '@/components/atoms/button'
import { Field, FieldError, FieldLabel } from '@/components/atoms/field'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/atoms/popover'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/atoms/tooltip'
import {
  FileUpload,
  FileUploadContent,
  FileUploadInput,
  FileUploadItem,
  type FileUploadProps
} from '@/components/molecules/file-upload/file-upload'
import { getFileUrl, type UploadedFile, useFileUpload } from '@/components/molecules/file-upload/lib'

export const fileFormSchema = z.object({
  files: z.array(z.custom<File>()).min(1, 'Please select the file')
})

export const defaultFileFormValue: z.input<typeof fileFormSchema> = {
  files: []
}

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

export default function FileButton({ id }: { id: string }) {
  const { editor } = useCurrentEditor()
  const { fileUploadPending, uploadFile } = useFileUpload()

  const [openPopover, setOpenPopover] = useState(false)

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
        setOpenPopover(false)
      } catch {
        toast.error('Failure', {
          description: 'An error occurred, please try again'
        })
      }
    }
  })

  return (
    <Popover
      onOpenChange={(open) => {
        setOpenPopover(open)
        if (!open) {
          fileForm.reset()
        }
      }}
      open={openPopover}
    >
      <Tooltip>
        <TooltipTrigger
          render={
            <PopoverTrigger
              render={
                <Button size='icon' variant='ghost'>
                  <PaperclipIcon />
                </Button>
              }
            />
          }
        />

        <TooltipContent>File</TooltipContent>
      </Tooltip>

      <PopoverContent className='w-xs space-y-6'>
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
                    {...fileUploaderDropzoneOptions}
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
                <TooltipTrigger
                  render={
                    <Button
                      disabled={!canSubmit}
                      form={fileForm.formId}
                      loading={fileUploadPending || isSubmitting}
                      size='icon'
                      type='submit'
                      variant='outline'
                    >
                      <CheckCircleIcon />
                    </Button>
                  }
                />
                <TooltipContent>submitButton</TooltipContent>
              </Tooltip>
            )}
          </fileForm.Subscribe>
        </div>
      </PopoverContent>
    </Popover>
  )
}
