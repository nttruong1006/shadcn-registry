import { useCurrentEditor, useEditorState } from '@tiptap/react'
import { RedoIcon, UndoIcon } from 'lucide-react'
import { memo } from 'react'
import TooltipButton from './tooltip-button'

// Component
const HistoryButtons = memo(() => {
  // Hooks
  const { editor } = useCurrentEditor()
  const editorState = useEditorState({
    editor,
    selector: ({ editor }) => {
      return {
        isUndoDisabled: !editor?.can().undo(),
        isRedoDisabled: !editor?.can().redo()
      }
    }
  })

  // Template
  return (
    <div className='flex gap-1'>
      <TooltipButton
        disabled={editorState?.isUndoDisabled}
        Icon={UndoIcon}
        kbd='Ctrl Z'
        label='Undo'
        onClick={() => editor?.chain().focus().undo().run()}
      />

      <TooltipButton
        disabled={editorState?.isRedoDisabled}
        Icon={RedoIcon}
        kbd='Ctrl Y'
        label='Redo'
        onClick={() => editor?.chain().focus().redo().run()}
      />
    </div>
  )
})

HistoryButtons.displayName = 'HistoryButtons'
export default HistoryButtons
