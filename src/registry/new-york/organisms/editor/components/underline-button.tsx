import { useEditorState } from '@tiptap/react'
import { UnderlineIcon } from 'lucide-react'
import { useInternalEditor } from './lib'
import TooltipButton from './tooltip-button'

export default function UnderlineButton() {
  const editor = useInternalEditor()
  const editorState = useEditorState({
    editor,
    selector: ({ editor }) => {
      return {
        isActive: editor?.isActive('underline'),
        isEditable: editor.isEditable && editor.can().toggleUnderline()
      }
    }
  })

  return (
    <TooltipButton
      disabled={!editorState.isEditable}
      Icon={UnderlineIcon}
      isActive={editorState.isActive}
      kbd='Ctrl U'
      label='Underline'
      name='underline'
      onClick={() => editor.chain().focus().toggleUnderline().run()}
    />
  )
}
