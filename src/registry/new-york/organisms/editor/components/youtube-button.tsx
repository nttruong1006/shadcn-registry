import { useForm } from '@tanstack/react-form'
import { useCurrentEditor } from '@tiptap/react'
import { CheckCircle, TvMinimalPlay } from 'lucide-react'
import { useRef, useState, useTransition } from 'react'
import z from 'zod'
import { Button } from '@/components/atoms/button'
import { Field, FieldError, FieldLabel } from '@/components/atoms/field'
import { Input } from '@/components/atoms/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/atoms/popover'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/atoms/tooltip'
import type { CallbackRef, SetExtensions } from './editor'
import { isValidYoutubeUrl, minWidth } from './lib'

const youtubeFormSchema = z.object({
  url: z
    .string()
    .trim()
    .min(1, 'Please enter the URL')
    .refine((value) => isValidYoutubeUrl(value), 'URL is invalid')
})

const defaultYoutubeFormValue: z.input<typeof youtubeFormSchema> = {
  url: ''
}

export default function YoutubeButton({
  id,
  callbackRef,
  setExtensions
}: {
  id: string
  callbackRef: CallbackRef
  setExtensions: SetExtensions
}) {
  const { editor } = useCurrentEditor()
  const [isPending, startTransition] = useTransition()

  const isExtensionLoadedRef = useRef(false)
  const [openPopover, setOpenPopover] = useState(false)

  const youtubeForm = useForm({
    formId: `${id}-youtube-form`,
    defaultValues: defaultYoutubeFormValue,
    validators: {
      onSubmit: youtubeFormSchema
    },
    onSubmit: ({ value }) => {
      const { url } = youtubeFormSchema.parse(value)
      const callback: CallbackRef['current'] = (editor) => {
        editor
          ?.chain()
          .focus()
          .setYoutubeVideo({
            src: url
          })
          .enter()
          .run()
      }

      // Add youtube node view
      if (isExtensionLoadedRef.current) {
        return callback(editor)
      }

      // Load extension
      startTransition(async () => {
        try {
          const { default: CustomYoutubeExtension } = await import('./custom-youtube-extension')

          callbackRef.current = callback

          setExtensions((prev) => [
            ...prev,
            CustomYoutubeExtension.configure({
              nocookie: true,
              width: minWidth,
              height: 180
            })
          ])

          isExtensionLoadedRef.current = true
        } catch (error) {
          console.error('An error occurred when load the CustomYoutube extension', error)
        }
      })

      // Close popover
      setOpenPopover(false)
    }
  })

  return (
    <Popover
      onOpenChange={(open) => {
        setOpenPopover(open)
        if (!open) {
          youtubeForm.reset()
        }
      }}
      open={openPopover}
    >
      <Tooltip>
        <TooltipTrigger
          render={
            <PopoverTrigger
              render={
                <Button loading={isPending} size='icon' variant='ghost'>
                  <TvMinimalPlay />
                </Button>
              }
            />
          }
        />
        <TooltipContent>YouTube</TooltipContent>
      </Tooltip>

      <PopoverContent className='w-xs'>
        <form
          className='space-y-4'
          id={youtubeForm.formId}
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            youtubeForm.handleSubmit()
          }}
        >
          <youtubeForm.Field name='url'>
            {(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={`editor-${id}-url`}>
                    <span>URL</span> <span className='text-destructive'>*</span>
                  </FieldLabel>

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
          </youtubeForm.Field>

          <div className='flex items-center justify-end gap-1'>
            <youtubeForm.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
              {([canSubmit, isSubmitting]) => (
                <Tooltip>
                  <TooltipTrigger
                    render={
                      <Button
                        disabled={!canSubmit}
                        form={youtubeForm.formId}
                        loading={isSubmitting}
                        size='icon'
                        type='submit'
                        variant='outline'
                      >
                        <CheckCircle />
                      </Button>
                    }
                  />
                  <TooltipContent>Save</TooltipContent>
                </Tooltip>
              )}
            </youtubeForm.Subscribe>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  )
}
