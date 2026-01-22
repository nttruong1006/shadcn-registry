import { useForm } from '@tanstack/react-form'
import { useCurrentEditor, useEditorState } from '@tiptap/react'
import { CheckCircle, Copy, ExternalLink, Link, Trash, Unlink } from 'lucide-react'
import React from 'react'
import z from 'zod'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/utils/ui'

// Link form schema
const linkFormSchema = z.object({
  url: z
    .string()
    .trim()
    .min(1, 'Please enter the URL')
    .refine(
      (url) =>
        /https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z]{2,}\b(?:[-a-zA-Z0-9@:%._+~#=?!&/]*)(?:[-a-zA-Z0-9@:%._+~#=?!&/]*)/gi.test(
          url
        ),
      'URL is invalid'
    ),
  displayText: z.string().trim(),
  isOpenInNewTab: z.boolean()
})

// Default link form value
const defaultLinkFormValue: z.input<typeof linkFormSchema> = {
  url: '',
  displayText: '',
  isOpenInNewTab: false
} as const

// Component
const LinkButton = React.memo<{
  id: string
}>(({ id }) => {
  // Hooks
  const { editor } = useCurrentEditor()
  const editorState = useEditorState({
    editor,
    selector: ({ editor }) => {
      return { isActive: editor?.isActive('link') }
    }
  })

  // Refs
  const isUpdateModeRef = React.useRef(false)

  // States
  const [isOpenPopover, setIsOpenPopover] = React.useState(false)

  // Form
  const linkForm = useForm({
    formId: `${id}-link-form`,
    defaultValues: defaultLinkFormValue,
    validators: {
      onSubmit: linkFormSchema
    },
    onSubmit: ({ value }) => {
      const { url, displayText, isOpenInNewTab } = linkFormSchema.parse(value)

      // Add link node view
      let chains = editor
        ?.chain()
        .extendMarkRange('link')
        .insertContent({
          type: 'text',
          text: displayText || url,
          marks: [
            {
              type: 'link',
              attrs: {
                href: url,
                target: isOpenInNewTab ? '_blank' : '_self'
              }
            }
          ]
        })
        .setLink({ href: url })

      if (isUpdateModeRef.current) {
        // Reset is update mode ref
        isUpdateModeRef.current = false
      } else {
        // Enter new line when create new link
        chains = chains?.enter()
      }

      chains?.focus().run()

      // Close popover
      setIsOpenPopover(false)
    }
  })

  // Methods
  const openLinkInNewTab = () => {
    window.open(linkForm.getFieldValue('url'), '_blank', 'noopener,noreferrer')
  }

  const unsetLink = () => {
    editor?.chain().focus().extendMarkRange('link').unsetLink().run()
    linkForm.reset()
    setIsOpenPopover(false)
  }

  const copyLink = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    navigator.clipboard.writeText(linkForm.getFieldValue('url'))
  }

  const deleteLink = () => {
    editor?.chain().focus().extendMarkRange('link').deleteSelection().run()
  }

  // Template
  return (
    <Popover open={isOpenPopover} onOpenChange={setIsOpenPopover}>
      <Tooltip>
        <TooltipTrigger asChild>
          <PopoverTrigger asChild>
            <Button
              size='icon'
              variant='ghost'
              className={cn({
                'bg-accent text-accent-foreground': editorState?.isActive
              })}
            >
              <Link />
            </Button>
          </PopoverTrigger>
        </TooltipTrigger>

        <TooltipContent>Link</TooltipContent>
      </Tooltip>

      <PopoverContent
        className='space-y-4'
        onOpenAutoFocus={() => {
          const isLinkActive = editor?.isActive('link')
          const { href, target } = editor?.getAttributes('link') ?? {}

          if (isLinkActive && href) {
            linkForm.setFieldValue('url', href)
            linkForm.setFieldValue(
              'displayText',
              editor?.view.domAtPos(editor?.state.selection.from).node.textContent ?? ''
            )
            linkForm.setFieldValue('isOpenInNewTab', target === '_blank')
            isUpdateModeRef.current = true
            setIsOpenPopover(true)
          }
        }}
        onCloseAutoFocus={() => linkForm.reset()}
      >
        <form
          id={linkForm.formId}
          className='w-xs space-y-6'
          onSubmit={(e) => {
            e.preventDefault()
            linkForm.handleSubmit()
          }}
        >
          <linkForm.Field name='url'>
            {(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={`editor-${linkForm.formId}-url`}>URL *</FieldLabel>

                  <Input
                    id={`editor-${linkForm.formId}-url`}
                    name={field.name}
                    value={field.state.value}
                    placeholder='Enter URL'
                    aria-invalid={isInvalid}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />

                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              )
            }}
          </linkForm.Field>

          <linkForm.Field name='displayText'>
            {(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={`editor-${linkForm.formId}-display-text`}>Display text</FieldLabel>

                  <Input
                    id={`editor-${linkForm.formId}-display-text`}
                    name={field.name}
                    value={field.state.value}
                    placeholder='Enter display text'
                    aria-invalid={isInvalid}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />

                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              )
            }}
          </linkForm.Field>

          <linkForm.Field name='isOpenInNewTab'>
            {(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
              return (
                <Field data-invalid={isInvalid} orientation='horizontal'>
                  <Checkbox
                    id={`editor-${linkForm.formId}-is-open-in-new-tab`}
                    name={field.name}
                    checked={field.state.value}
                    onCheckedChange={(checked) => field.handleChange(checked === true)}
                  />

                  <FieldLabel htmlFor={`editor-${linkForm.formId}-is-open-in-new-tab`}>Open in new tab</FieldLabel>

                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              )
            }}
          </linkForm.Field>

          <div className='flex items-center justify-end gap-2'>
            {
              <linkForm.Subscribe selector={(state) => state.values.url}>
                {(linkFormUrl) => (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button size='icon' variant='outline' disabled={!linkFormUrl} onClick={openLinkInNewTab}>
                        <ExternalLink />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Open link in new tab</TooltipContent>
                  </Tooltip>
                )}
              </linkForm.Subscribe>
            }

            <Tooltip>
              <TooltipTrigger asChild>
                <Button size='icon' variant='outline' disabled={!editor?.isActive('link')} onClick={unsetLink}>
                  <Unlink />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Unset</TooltipContent>
            </Tooltip>

            {
              <linkForm.Subscribe selector={(state) => state.values.url}>
                {(linkFormUrl) => (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button size='icon' variant='outline' disabled={!linkFormUrl} onClick={copyLink}>
                        <Copy />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Copy</TooltipContent>
                  </Tooltip>
                )}
              </linkForm.Subscribe>
            }

            {
              <linkForm.Subscribe selector={(state) => state.values.url}>
                {(linkFormUrl) => (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button size='icon' variant='outline' disabled={!linkFormUrl} onClick={deleteLink}>
                        <Trash />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Delete</TooltipContent>
                  </Tooltip>
                )}
              </linkForm.Subscribe>
            }

            <linkForm.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
              {([canSubmit, isSubmitting]) => (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size='icon'
                      variant='outline'
                      type='submit'
                      isLoading={isSubmitting}
                      form={linkForm.formId}
                      disabled={!canSubmit}
                    >
                      <CheckCircle />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Save</TooltipContent>
                </Tooltip>
              )}
            </linkForm.Subscribe>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  )
})

LinkButton.displayName = 'LinkButton'
export default LinkButton
