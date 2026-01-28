import { useForm } from '@tanstack/react-form'
import { useCurrentEditor } from '@tiptap/react'
import { CheckCircleIcon, ImageIcon } from 'lucide-react'
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
import { getFileUrl, useFileUpload } from '@/registry/new-york/molecules/file-upload/components/lib'
import { Button } from '@/registry/new-york/ui/button/components/button'
import { Field, FieldError, FieldLabel } from '@/registry/new-york/ui/field/components/field'
import { Input } from '@/registry/new-york/ui/input/components/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/registry/new-york/ui/popover/components/popover'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/registry/new-york/ui/tabs/components/tabs'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/registry/new-york/ui/tooltip/components/tooltip'

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
        break
      }
      default: {
        break
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
const ImageButton = memo<{
  id: string
}>(({ id }) => {
  // Hooks
  const { editor } = useCurrentEditor()
  const { isUploadFilePending, uploadFile } = useFileUpload()

  // States
  const [isOpenPopover, setIsOpenPopover] = useState(false)

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
            for (const uploadedFile of uploadedFiles) {
              if (!uploadedFile) {
                return
              }
              editor
                ?.chain()
                .focus()
                .setImage({
                  src: getFileUrl(uploadedFile.path)
                })
                .enter()
                .run()
            }
            break
          }
          default: {
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
    <Popover onOpenChange={setIsOpenPopover} open={isOpenPopover}>
      <Tooltip>
        <TooltipTrigger asChild>
          <PopoverTrigger asChild>
            <Button size='icon' variant='ghost'>
              <ImageIcon />
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
                onValueChange={(value) => {
                  imageForm.setFieldValue('mode', value as FormMode)
                  imageForm.validate('submit')
                }}
                value={formMode}
              >
                {/* Tabs list */}
                <TabsList className='w-full [&_button]:flex-1' loop>
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
                            aria-invalid={isInvalid}
                            id={`editor-${id}-url`}
                            name={field.name}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            placeholder={'Enter URL'}
                            value={field.state.value}
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
                            className='xl:grid-cols-1'
                            dropzoneOptions={fileUploaderDropzoneOptions}
                            onValueChange={field.handleChange as FileUploadProps['onValueChange']}
                            value={field.state.value}
                          >
                            <FileUploadInput aria-invalid={isInvalid} id={`editor-${imageForm.formId}-files`} />
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
                    disabled={!canSubmit}
                    form={imageForm.formId}
                    isLoading={isUploadFilePending || isSubmitting}
                    size='icon'
                    type='submit'
                    variant='outline'
                  >
                    <CheckCircleIcon />
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
