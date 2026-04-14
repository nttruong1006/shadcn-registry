import { useForm } from '@tanstack/react-form'
import { useCurrentEditor } from '@tiptap/react'
import { CheckCircleIcon, ImageIcon } from 'lucide-react'
import { useState } from 'react'
import type { DropzoneOptions } from 'react-dropzone'
import { toast } from 'sonner'
import z from 'zod'
import { Button } from '@/components/atoms/button'
import { Field, FieldError, FieldLabel } from '@/components/atoms/field'
import { Input } from '@/components/atoms/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/atoms/popover'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/atoms/tabs'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/atoms/tooltip'
import {
  FileUpload,
  FileUploadContent,
  FileUploadInput,
  FileUploadItem,
  type FileUploadProps
} from '@/components/molecules/file-upload/file-upload'
import { getFileUrl, useFileUpload } from '@/components/molecules/file-upload/lib'

enum ImageFormMode {
  Url = 'Url',
  Files = 'Files'
}

const imageFormSchema = z
  .object({
    mode: z.enum(ImageFormMode),
    url: z.string().trim(),
    files: z.array(z.custom<File>())
  })
  .superRefine((form, ctx) => {
    const { mode, url, files } = form
    switch (mode) {
      case ImageFormMode.Url: {
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
      case ImageFormMode.Files: {
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

const defaultImageFormValue: z.input<typeof imageFormSchema> = {
  mode: ImageFormMode.Url,
  url: '',
  files: []
}

const fileUploaderDropzoneOptions: DropzoneOptions = {
  maxFiles: 10,
  multiple: true,
  accept: {
    'image/jpeg': ['.jpeg', '.jpg'],
    'image/png': ['.png'],
    'image/webp': ['.webp'],
    'image/svg+xml': ['.svg']
  }
}

export default function ImageButton({ id }: { id: string }) {
  const { editor } = useCurrentEditor()
  const { fileUploadPending, uploadFile } = useFileUpload()

  const [openPopover, setOpenPopover] = useState(false)

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
          case ImageFormMode.Url: {
            editor?.chain().focus().setImage({ src: url }).enter().run()
            break
          }
          case ImageFormMode.Files: {
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
          imageForm.reset()
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
                  <ImageIcon />
                </Button>
              }
            />
          }
        />
        <TooltipContent>Image</TooltipContent>
      </Tooltip>

      <PopoverContent className='w-xs space-y-6'>
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
                  imageForm.setFieldValue('mode', value as ImageFormMode)
                  imageForm.validate('submit')
                }}
                value={formMode}
              >
                {/* Tabs list */}
                <TabsList className='w-full [&_button]:flex-1'>
                  <TabsTrigger value={ImageFormMode.Url}>URL</TabsTrigger>
                  <TabsTrigger value={ImageFormMode.Files}>File</TabsTrigger>
                </TabsList>

                {/* Tabs content */}
                {/* Url tab */}
                <TabsContent value={ImageFormMode.Url}>
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
                <TabsContent value={ImageFormMode.Files}>
                  <imageForm.Field name='files'>
                    {(field) => {
                      const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                      return (
                        <Field data-invalid={isInvalid}>
                          <FieldLabel htmlFor={`editor-${imageForm.formId}-files`}>Files *</FieldLabel>

                          <FileUpload
                            className='xl:grid-cols-1'
                            {...fileUploaderDropzoneOptions}
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
                <TooltipTrigger
                  render={
                    <Button
                      disabled={!canSubmit}
                      form={imageForm.formId}
                      loading={fileUploadPending || isSubmitting}
                      size='icon'
                      type='submit'
                      variant='outline'
                    >
                      <CheckCircleIcon />
                    </Button>
                  }
                />
                <TooltipContent>Save</TooltipContent>
              </Tooltip>
            )}
          </imageForm.Subscribe>
        </div>
      </PopoverContent>
    </Popover>
  )
}
