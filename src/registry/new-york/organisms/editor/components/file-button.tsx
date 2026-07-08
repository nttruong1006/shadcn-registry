import { useForm } from '@tanstack/react-form'
import { useEditorState } from '@tiptap/react'
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
import { useInternalEditor } from './lib'

export const fileFormSchema = z.object({
  files: z.array(z.custom<File>()).min(1, 'Please select the file')
})

export const defaultFileFormValue: z.input<typeof fileFormSchema> = {
  files: []
}

export const fileUploaderDropzoneOptions: DropzoneOptions = {
  accept: {
    'application/msword': ['.doc'],
    'application/pdf': ['.pdf'],
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    'application/xml': ['.xml']
  },
  maxFiles: 10,
  multiple: true
}

export default function FileButton({ id }: { id: string }) {
  const editor = useInternalEditor()
  const editorState = useEditorState({
    editor,
    selector: ({ editor }) => ({
      isEditable: editor.isEditable
    })
  })

  const [openPopover, setOpenPopover] = useState(false)
  const { fileUploadPending, uploadFile } = useFileUpload()

  const fileForm = useForm({
    defaultValues: defaultFileFormValue,
    formId: `${id}-file-form`,
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
              mime: uploadedFile.mime,
              name: uploadedFile.original,
              size: uploadedFile.compress_info[''].size,
              url: getFileUrl(uploadedFile.path)
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
    },
    validators: {
      onSubmit: fileFormSchema
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
                <Button disabled={!editorState.isEditable} size='icon' variant='ghost'>
                  <PaperclipIcon />
                </Button>
              }
            />
          }
        />

        <TooltipContent>File</TooltipContent>
      </Tooltip>

      <PopoverContent className='w-xs'>
        <div>Acceptable formats: doc, docx, xlsx, xml, pdf</div>

        <form
          className='space-y-4'
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

          <div className='flex items-center justify-end gap-2'>
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
        </form>
      </PopoverContent>
    </Popover>
  )
}
