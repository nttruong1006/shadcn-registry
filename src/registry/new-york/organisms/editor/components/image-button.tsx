import { useForm } from '@tanstack/react-form'
import { useCurrentEditor } from '@tiptap/react'
import { CheckCircle, Image } from 'lucide-react'
import React from 'react'
import type { DropzoneOptions } from 'react-dropzone'
import { toast } from 'sonner'
import z from 'zod'
import {
  FileUpload,
  FileUploadContent,
  FileUploadInput,
  FileUploadItem,
  type FileUploadProps,
  getFileUrl,
  useFileUpload
} from '@/components/molecules/file-upload'
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

// Form mode
export enum FormMode {
  Url = 'Url',
  Files = 'Files'
}

// Image form schema
export const imageFormSchema = z
  .object({
    mode: z.enum(FormMode),
    url: z.string().trim(),
    files: z.array(z.custom<File>())
  })
  .superRefine((form, ctx) => {
    const { mode, url, files } = form
    switch (mode) {
      case FormMode.Url: {
        if (!url) {
          ctx.addIssue({
            code: 'custom',
            path: ['url'],
            message: 'Please enter the URL'
          })
          break
        }

        if (!/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|jpeg|png|webp|svg)/g.test(url)) {
          ctx.addIssue({
            code: 'custom',
            path: ['url'],
            message: 'URL is invalid'
          })
          break
        }

        break
      }
      case FormMode.Files: {
        if (!files.length) {
          ctx.addIssue({
            code: 'custom',
            path: ['files'],
            message: 'Please select the image file'
          })
        }
      }
    }
  })

// Default image form value
export const defaultImageFormValue: z.input<typeof imageFormSchema> = {
  mode: FormMode.Url,
  url: '',
  files: []
}

// File uploader dropzone options
export const fileUploaderDropzoneOptions: DropzoneOptions = {
  maxFiles: 10,
  multiple: true,
  accept: {
    'image/jpeg': ['.jpeg', '.jpg'],
    'image/png': ['.png'],
    'image/webp': ['.webp'],
    'image/svg+xml': ['.svg']
  }
}

// Component
const ImageButton = React.memo<{
  id: string
}>(({ id }) => {
  // Hooks
  const { editor } = useCurrentEditor()
  const { isUploadFilePending, uploadFile } = useFileUpload()

  // States
  const [isOpenPopover, setIsOpenPopover] = React.useState(false)

  // Form
  const imageForm = useForm({
    formId: `${id}-file-form`,
    defaultValues: defaultImageFormValue,
    validators: {
      onSubmit: imageFormSchema
    },
    onSubmit: async ({ value }) => {
      try {
        const { mode, url, files } = imageFormSchema.parse(value)

        // Add image node view
        switch (mode) {
          case FormMode.Url: {
            editor?.chain().focus().setImage({ src: url }).enter().run()
            break
          }
          case FormMode.Files: {
            const uploadedFiles = await Promise.all(files.map(async (file) => await uploadFile(file)))
            uploadedFiles.forEach((uploadedFile) => {
              if (!uploadedFile) return

              editor
                ?.chain()
                .focus()
                .setImage({
                  src: getFileUrl(uploadedFile.path)
                })
                .enter()
                .run()
            })
            break
          }
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
    <Popover open={isOpenPopover} onOpenChange={setIsOpenPopover}>
      <Tooltip>
        <TooltipTrigger asChild>
          <PopoverTrigger asChild>
            <Button size='icon' variant='ghost'>
              <Image />
            </Button>
          </PopoverTrigger>
        </TooltipTrigger>

        <TooltipContent>Image</TooltipContent>
      </Tooltip>

      <PopoverContent className='w-xs space-y-6' onCloseAutoFocus={() => imageForm.reset()}>
        <div>Acceptable formats: jpeg, jpg, png, webp, svg</div>

        <form
          id={imageForm.formId}
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            imageForm.handleSubmit()
          }}
        >
          <imageForm.Subscribe selector={(state) => state.values.mode}>
            {(formMode) => (
              <Tabs
                value={formMode}
                onValueChange={(value) => {
                  imageForm.setFieldValue('mode', value as FormMode)
                  imageForm.validate('submit')
                }}
              >
                {/* Tabs list */}
                <TabsList loop className='w-full [&_button]:flex-1'>
                  <TabsTrigger value={FormMode.Url}>URL</TabsTrigger>
                  <TabsTrigger value={FormMode.Files}>File</TabsTrigger>
                </TabsList>

                {/* Tabs content */}
                {/* Url tab */}
                <TabsContent value={FormMode.Url}>
                  <imageForm.Field name='url'>
                    {(field) => {
                      const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                      return (
                        <Field data-invalid={isInvalid}>
                          <FieldLabel htmlFor={`editor-${id}-url`}>URL *</FieldLabel>

                          <Input
                            id={`editor-${id}-url`}
                            name={field.name}
                            value={field.state.value}
                            placeholder={`Enter URL`}
                            aria-invalid={isInvalid}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                          />

                          {isInvalid && <FieldError errors={field.state.meta.errors} />}
                        </Field>
                      )
                    }}
                  </imageForm.Field>
                </TabsContent>

                {/* Files tab */}
                <TabsContent value={FormMode.Files}>
                  <imageForm.Field name='files'>
                    {(field) => {
                      const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                      return (
                        <Field data-invalid={isInvalid}>
                          <FieldLabel htmlFor={`editor-${imageForm.formId}-files`}>Files *</FieldLabel>

                          <FileUpload
                            value={field.state.value}
                            dropzoneOptions={fileUploaderDropzoneOptions}
                            className='xl:grid-cols-1'
                            onValueChange={field.handleChange as FileUploadProps['onValueChange']}
                          >
                            <FileUploadInput id={`editor-${imageForm.formId}-files`} aria-invalid={isInvalid} />
                            <FileUploadContent>
                              {field.state.value.map((value, index) => (
                                <FileUploadItem
                                  // biome-ignore lint/suspicious/noArrayIndexKey: ignore
                                  key={index}
                                  index={index}
                                  value={value}
                                />
                              ))}
                            </FileUploadContent>
                          </FileUpload>

                          {isInvalid && <FieldError errors={field.state.meta.errors} />}
                        </Field>
                      )
                    }}
                  </imageForm.Field>
                </TabsContent>
              </Tabs>
            )}
          </imageForm.Subscribe>
        </form>

        <div className='flex items-center justify-end gap-1'>
          <imageForm.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
            {([canSubmit, isSubmitting]) => (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size='icon'
                    variant='outline'
                    isLoading={isUploadFilePending || isSubmitting}
                    type='submit'
                    form={imageForm.formId}
                    disabled={!canSubmit}
                  >
                    <CheckCircle />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Save</TooltipContent>
              </Tooltip>
            )}
          </imageForm.Subscribe>
        </div>
      </PopoverContent>
    </Popover>
  )
})

ImageButton.displayName = 'ImageButton'
export default ImageButton
