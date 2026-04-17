import { useCurrentEditor, useEditorState } from '@tiptap/react'
import { AlignLeft, ChevronDown } from 'lucide-react'
import { useRef, useTransition } from 'react'
import { Button } from '@/components/atoms/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from '@/components/atoms/dropdown-menu'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/atoms/tooltip'
import { cn } from '@/utils/ui'
import type { CallbackRef, SetExtensions } from './editor'
import { alignments } from './lib'

export default function TextAlignButton({
  callbackRef,
  setExtensions
}: {
  setExtensions: SetExtensions
  callbackRef: CallbackRef
}) {
  const { editor } = useCurrentEditor()
  const editorState = useEditorState({
    editor,
    selector: ({ editor }) => {
      return {
        isActive: {
          left: editor?.isActive('paragraph', { textAlign: 'left' }),
          center: editor?.isActive('paragraph', { textAlign: 'center' }),
          right: editor?.isActive('paragraph', { textAlign: 'right' }),
          justify: editor?.isActive('paragraph', { textAlign: 'justify' })
        }
      }
    }
  })

  const [isPending, startTransition] = useTransition()
  const isExtensionLoadedRef = useRef(false)

  return (
    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger
          render={
            <DropdownMenuTrigger
              render={
                <Button className='gap-1' loading={isPending} variant='ghost'>
                  <AlignLeft />
                  <ChevronDown />
                </Button>
              }
            />
          }
        />
        <TooltipContent>Text align</TooltipContent>
      </Tooltip>

      <DropdownMenuContent>
        {alignments.map((alignment) => {
          const isActive = editorState?.isActive[alignment.value]
          return (
            <DropdownMenuItem
              className={cn({
                'bg-accent text-accent-foreground': isActive
              })}
              key={alignment.value}
              onClick={() => {
                const callback: CallbackRef['current'] = (editor) => {
                  editor?.chain().focus().setTextAlign(alignment.value).run()
                }

                if (isExtensionLoadedRef.current) {
                  return callback(editor)
                }

                // Load extension
                startTransition(async () => {
                  try {
                    const extension = await import('@tiptap/extension-text-align')

                    callbackRef.current = callback

                    setExtensions((prev) => [
                      ...prev,
                      extension.default.configure({
                        types: ['heading', 'paragraph']
                      })
                    ])

                    isExtensionLoadedRef.current = true
                  } catch (error) {
                    console.error('An error occurred when load the TextAlign extension', error)
                  }
                })
              }}
            >
              <alignment.icon />
              <span>{alignment.label}</span>
              <DropdownMenuShortcut className={cn({ 'text-accent-foreground': isActive })}>
                {alignment.shortcut}
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
