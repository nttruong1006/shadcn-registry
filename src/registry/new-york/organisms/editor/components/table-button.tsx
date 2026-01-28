import { useCurrentEditor } from '@tiptap/react'
import { TableIcon } from 'lucide-react'
import { memo, useRef, useTransition } from 'react'
import type { CallbackRef, SetExtensions } from './editor'
import TooltipButton from './tooltip-button'

// Component
const TableButton = memo<{
  callbackRef: CallbackRef
  setExtensions: SetExtensions
}>(({ callbackRef, setExtensions }) => {
  // Hooks
  const { editor } = useCurrentEditor()
  const [isPending, startTransition] = useTransition()

  // Refs
  const isExtensionLoadedRef = useRef(false)

  // Template
  return (
    <TooltipButton
      Icon={TableIcon}
      isLoading={isPending}
      label='Table'
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
})

TableButton.displayName = 'TableButton'
export default TableButton
