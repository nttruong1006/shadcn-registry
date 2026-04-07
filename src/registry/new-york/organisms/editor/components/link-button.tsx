import { useForm } from '@tanstack/react-form'
import { useCurrentEditor, useEditorState } from '@tiptap/react'
import { CheckCircleIcon, CopyIcon, ExternalLinkIcon, LinkIcon, TrashIcon, UnlinkIcon } from 'lucide-react'
import { type MouseEvent, useRef, useState } from 'react'
import { toast } from 'sonner'
import z from 'zod'
import { Button } from '@/components/atoms/button'
import { Checkbox } from '@/components/atoms/checkbox'
import { Field, FieldError, FieldLabel } from '@/components/atoms/field'
import { Input } from '@/components/atoms/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/atoms/popover'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/atoms/tooltip'
import { cn } from '@/utils/ui'

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

const defaultLinkFormValue: z.input<typeof linkFormSchema> = {
  url: '',
  displayText: '',
  isOpenInNewTab: false
} as const

export default function LinkButton({ id }: { id: string }) {
  const { editor } = useCurrentEditor()
  const editorState = useEditorState({
    editor,
    selector: ({ editor }) => {
      return { isActive: editor?.isActive('link') }
    }
  })

  const isUpdateModeRef = useRef(false)
  const [openPopover, setOpenPopover] = useState(false)

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
      setOpenPopover(false)
    }
  })

  function openLinkInNewTab() {
    window.open(linkForm.getFieldValue('url'), '_blank', 'noopener,noreferrer')
  }

  function unsetLink() {
    editor?.chain().focus().extendMarkRange('link').unsetLink().run()
    linkForm.reset()
    setOpenPopover(false)
  }

  async function copyLink(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    await navigator.clipboard.writeText(linkForm.getFieldValue('url'))
    toast.success('Success', {
      description: 'Link copied to clipboard'
    })
  }

  function deleteLink() {
    editor?.chain().focus().extendMarkRange('link').deleteSelection().run()
  }

  return (
    <Popover
      onOpenChange={(open) => {
        setOpenPopover(open)
        if (open) {
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
            setOpenPopover(true)
          }
        } else {
          linkForm.reset()
        }
      }}
      open={openPopover}
    >
      <Tooltip>
        <TooltipTrigger
          render={
            <PopoverTrigger
              render={
                <Button
                  className={cn({
                    'bg-accent text-accent-foreground': editorState?.isActive
                  })}
                  size='icon'
                  variant='ghost'
                >
                  <LinkIcon />
                </Button>
              }
            />
          }
        />
        <TooltipContent>Link</TooltipContent>
      </Tooltip>

      <PopoverContent className='space-y-4'>
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
                    <TooltipTrigger
                      render={
                        <Button disabled={!linkFormUrl} onClick={openLinkInNewTab} size='icon' variant='outline'>
                          <ExternalLinkIcon />
                        </Button>
                      }
                    />
                    <TooltipContent>Open link in new tab</TooltipContent>
                  </Tooltip>
                )}
              </linkForm.Subscribe>
            }

            <Tooltip>
              <TooltipTrigger
                render={
                  <Button disabled={!editor?.isActive('link')} onClick={unsetLink} size='icon' variant='outline'>
                    <UnlinkIcon />
                  </Button>
                }
              />
              <TooltipContent>Unset</TooltipContent>
            </Tooltip>

            {
              <linkForm.Subscribe selector={(state) => state.values.url}>
                {(linkFormUrl) => (
                  <Tooltip>
                    <TooltipTrigger
                      render={
                        <Button disabled={!linkFormUrl} onClick={copyLink} size='icon' variant='outline'>
                          <CopyIcon />
                        </Button>
                      }
                    />
                    <TooltipContent>Copy</TooltipContent>
                  </Tooltip>
                )}
              </linkForm.Subscribe>
            }

            {
              <linkForm.Subscribe selector={(state) => state.values.url}>
                {(linkFormUrl) => (
                  <Tooltip>
                    <TooltipTrigger
                      render={
                        <Button disabled={!linkFormUrl} onClick={deleteLink} size='icon' variant='outline'>
                          <TrashIcon />
                        </Button>
                      }
                    />
                    <TooltipContent>Delete</TooltipContent>
                  </Tooltip>
                )}
              </linkForm.Subscribe>
            }

            <linkForm.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
              {([canSubmit, isSubmitting]) => (
                <Tooltip>
                  <TooltipTrigger
                    render={
                      <Button
                        disabled={!canSubmit}
                        form={linkForm.formId}
                        loading={isSubmitting}
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
            </linkForm.Subscribe>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  )
}
