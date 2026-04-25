import { useEditorState } from '@tiptap/react'
import { StrikethroughIcon } from 'lucide-react'
import { useInternalEditor } from './lib'
import TooltipButton from './tooltip-button'

export default function StrikeButton() {
  const editor = useInternalEditor()
  const editorState = useEditorState({
    editor,
    selector: ({ editor }) => {
      return {
        isActive: editor.isActive('strike'),
        isEditable: editor.isEditable && editor.can().toggleStrike()
      }
    }
  })

  return (
    <TooltipButton
      disabled={!editorState.isEditable}
      Icon={StrikethroughIcon}
      isActive={editorState.isActive}
      kbd='Ctrl Shift S'
      label='Strike'
      onClick={() => editor.chain().focus().toggleStrike().run()}
    />
  )
}
