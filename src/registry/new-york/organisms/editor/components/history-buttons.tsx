import { useCurrentEditor, useEditorState } from '@tiptap/react'
import { RedoIcon, UndoIcon } from 'lucide-react'
import TooltipButton from './tooltip-button'

export default function HistoryButtons() {
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
}
