import { useEditorState } from '@tiptap/react'
import { BoldIcon } from 'lucide-react'
import { useInternalEditor } from './lib'
import TooltipButton from './tooltip-button'

export default function BoldButton() {
  const editor = useInternalEditor()
  const editorState = useEditorState({
    editor,
    selector: ({ editor }) => ({
      isActive: editor.isActive('bold'),
      isEditable: editor.isEditable && editor.can().toggleBold()
    })
  })

  return (
    <TooltipButton
      disabled={!editorState.isEditable}
      Icon={BoldIcon}
      isActive={editorState.isActive}
      kbd='Ctrl B'
      label='Bold'
      onClick={() => editor.chain().focus().toggleBold().run()}
    />
  )
}
