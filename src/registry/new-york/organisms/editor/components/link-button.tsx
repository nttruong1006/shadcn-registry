import { useForm } from '@tanstack/react-form'
import { useCurrentEditor, useEditorState } from '@tiptap/react'
import { CheckCircleIcon, CopyIcon, ExternalLinkIcon, LinkIcon, TrashIcon, UnlinkIcon } from 'lucide-react'
import { type MouseEvent, memo, useRef, useState } from 'react'
import { toast } from 'sonner'
import z from 'zod'
import { Button } from '@/registry/new-york/ui/button/components/button'
import { Checkbox } from '@/registry/new-york/ui/checkbox/components/checkbox'
import { Field, FieldError, FieldLabel } from '@/registry/new-york/ui/field/components/field'
import { Input } from '@/registry/new-york/ui/input/components/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/registry/new-york/ui/popover/components/popover'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/registry/new-york/ui/tooltip/components/tooltip'
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
const LinkButton = memo<{
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
  const isUpdateModeRef = useRef(false)

  // States
  const [isOpenPopover, setIsOpenPopover] = useState(false)

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

  const copyLink = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    await navigator.clipboard.writeText(linkForm.getFieldValue('url'))
    toast.success('Success', {
      description: 'Link copied to clipboard'
    })
  }

  const deleteLink = () => {
    editor?.chain().focus().extendMarkRange('link').deleteSelection().run()
  }

  // Template
  return (
    <Popover onOpenChange={setIsOpenPopover} open={isOpenPopover}>
      <Tooltip>
        <TooltipTrigger asChild>
          <PopoverTrigger asChild>
            <Button
              className={cn({
                'bg-accent text-accent-foreground': editorState?.isActive
              })}
              size='icon'
              variant='ghost'
            >
              <LinkIcon />
            </Button>
          </PopoverTrigger>
        </TooltipTrigger>

        <TooltipContent>Link</TooltipContent>
      </Tooltip>

      <PopoverContent
        className='space-y-4'
        onCloseAutoFocus={() => linkForm.reset()}
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
      >
        <form
          className='w-xs space-y-6'
          id={linkForm.formId}
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
                    aria-invalid={isInvalid}
                    id={`editor-${linkForm.formId}-url`}
                    name={field.name}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder='Enter URL'
                    value={field.state.value}
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
                    aria-invalid={isInvalid}
                    id={`editor-${linkForm.formId}-display-text`}
                    name={field.name}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder='Enter display text'
                    value={field.state.value}
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
                    checked={field.state.value}
                    id={`editor-${linkForm.formId}-is-open-in-new-tab`}
                    name={field.name}
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
                      <Button disabled={!linkFormUrl} onClick={openLinkInNewTab} size='icon' variant='outline'>
                        <ExternalLinkIcon />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Open link in new tab</TooltipContent>
                  </Tooltip>
                )}
              </linkForm.Subscribe>
            }

            <Tooltip>
              <TooltipTrigger asChild>
                <Button disabled={!editor?.isActive('link')} onClick={unsetLink} size='icon' variant='outline'>
                  <UnlinkIcon />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Unset</TooltipContent>
            </Tooltip>

            {
              <linkForm.Subscribe selector={(state) => state.values.url}>
                {(linkFormUrl) => (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button disabled={!linkFormUrl} onClick={copyLink} size='icon' variant='outline'>
                        <CopyIcon />
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
                      <Button disabled={!linkFormUrl} onClick={deleteLink} size='icon' variant='outline'>
                        <TrashIcon />
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
                      disabled={!canSubmit}
                      form={linkForm.formId}
                      isLoading={isSubmitting}
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
            </linkForm.Subscribe>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  )
})

LinkButton.displayName = 'LinkButton'
export default LinkButton
