import { useForm } from '@tanstack/react-form'
import { useCurrentEditor } from '@tiptap/react'
import { CheckCircle, TvMinimalPlay } from 'lucide-react'
import React from 'react'
import z from 'zod'
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import type { CallbackRef, SetExtensions } from './editor'
import { isValidYoutubeUrl, minWidth } from './lib'

// Youtube form schema
const youtubeFormSchema = z.object({
  url: z
    .string()
    .trim()
    .min(1, 'Please enter the URL')
    .refine((value) => isValidYoutubeUrl(value), 'URL is invalid')
})

// Default youtube form value
const defaultYoutubeFormValue: z.input<typeof youtubeFormSchema> = {
  url: ''
}

// Component
const YoutubeButton = React.memo<{
  id: string
  callbackRef: CallbackRef
  setExtensions: SetExtensions
}>(({ id, callbackRef, setExtensions }) => {
  // Hooks
  const { editor } = useCurrentEditor()
  const [isPending, startTransition] = React.useTransition()

  // Refs
  const isExtensionLoadedRef = React.useRef(false)

  // States
  const [isOpenPopover, setIsOpenPopover] = React.useState(false)

  // Form
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
      setIsOpenPopover(false)
    }
  })

  // Template
  return (
    <Popover open={isOpenPopover} onOpenChange={setIsOpenPopover}>
      <Tooltip>
        <TooltipTrigger asChild>
          <PopoverTrigger asChild>
            <Button size='icon' variant='ghost' isLoading={isPending}>
              <TvMinimalPlay />
            </Button>
          </PopoverTrigger>
        </TooltipTrigger>

        <TooltipContent>YouTube</TooltipContent>
      </Tooltip>

      <PopoverContent className='w-xs space-y-4' onCloseAutoFocus={() => youtubeForm.reset()}>
        <form
          id={youtubeForm.formId}
          className='space-y-6'
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
          </youtubeForm.Field>

          <div className='flex items-center justify-end gap-1'>
            <youtubeForm.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
              {([canSubmit, isSubmitting]) => (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size='icon'
                      variant='outline'
                      type='submit'
                      isLoading={isSubmitting}
                      form={youtubeForm.formId}
                      disabled={!canSubmit}
                    >
                      <CheckCircle />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Save</TooltipContent>
                </Tooltip>
              )}
            </youtubeForm.Subscribe>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  )
})

YoutubeButton.displayName = 'YoutubeButton'
export default YoutubeButton
