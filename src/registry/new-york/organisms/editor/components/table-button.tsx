import { useEditorState } from '@tiptap/react'
import { TableIcon } from 'lucide-react'
import { useRef, useTransition } from 'react'
import type { CallbackRef, SetExtensions } from './editor'
import { useInternalEditor } from './lib'
import TooltipButton from './tooltip-button'

export default function TableButton({
  callbackRef,
  setExtensions
}: {
  callbackRef: CallbackRef
  setExtensions: SetExtensions
}) {
  const editor = useInternalEditor()
  const editorState = useEditorState({
    editor,
    selector: ({ editor }) => ({
      isEditable: editor.isEditable
    })
  })

  const isExtensionLoadedRef = useRef(false)
  const [isPending, startTransition] = useTransition()

  return (
    <TooltipButton
      disabled={!editorState.isEditable}
      Icon={TableIcon}
      label='Table'
      loading={isPending}
      onClick={() => {
        const callback: CallbackRef['current'] = (editor) => {
          editor.chain().focus().insertTable({ cols: 3, rows: 3, withHeaderRow: true }).run()
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
                table: { allowTableNodeSelection: true, resizable: true }
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
