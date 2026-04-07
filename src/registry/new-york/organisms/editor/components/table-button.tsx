import { useCurrentEditor } from '@tiptap/react'
import { TableIcon } from 'lucide-react'
import { useRef, useTransition } from 'react'
import type { CallbackRef, SetExtensions } from './editor'
import TooltipButton from './tooltip-button'

export default function TableButton({
  callbackRef,
  setExtensions
}: {
  callbackRef: CallbackRef
  setExtensions: SetExtensions
}) {
  const { editor } = useCurrentEditor()
  const [isPending, startTransition] = useTransition()
  const isExtensionLoadedRef = useRef(false)

  return (
    <TooltipButton
      Icon={TableIcon}
      label='Table'
      loading={isPending}
      onClick={() => {
        const callback: CallbackRef['current'] = (editor) => {
          editor?.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
        }

        if (isExtensionLoadedRef.current) {
          return callback(editor)
        }

        // Load extension
        startTransition(async () => {
          try {
            const { TableKit } = await import('@tiptap/extension-table')
            callbackRef.current = callback
            setExtensions((prev) => [
              ...prev,
              TableKit.configure({
                table: { resizable: true, allowTableNodeSelection: true }
              })
            ])
            isExtensionLoadedRef.current = true
          } catch (error) {
            console.error('An error occurred when load the TableKit extension', error)
          }
        })
      }}
    />
  )
}
