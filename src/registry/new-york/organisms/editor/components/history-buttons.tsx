import { useEditorState } from '@tiptap/react'
import { RedoIcon, UndoIcon } from 'lucide-react'
import { useInternalEditor } from './lib'
import TooltipButton from './tooltip-button'

export default function HistoryButtons() {
  const editor = useInternalEditor()
  const editorState = useEditorState({
    editor,
    selector: ({ editor }) => {
      return {
        isUndoEnabled: editor.isEditable && editor.can().undo(),
        isRedoEnabled: editor.isEditable && editor.can().redo()
      }
    }
  })

  return (
    <div className='flex gap-1'>
      <TooltipButton
        disabled={!editorState.isUndoEnabled}
        Icon={UndoIcon}
        kbd='Ctrl Z'
        label='Undo'
        onClick={() => editor.chain().focus().undo().run()}
      />

      <TooltipButton
        disabled={!editorState.isRedoEnabled}
        Icon={RedoIcon}
        kbd='Ctrl Y'
        label='Redo'
        onClick={() => editor.chain().focus().redo().run()}
      />
    </div>
  )
}
