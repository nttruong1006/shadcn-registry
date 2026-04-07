import { useCurrentEditor, useEditorState } from '@tiptap/react'
import { StrikethroughIcon } from 'lucide-react'
import TooltipButton from './tooltip-button'

export default function StrikeButton() {
  const { editor } = useCurrentEditor()
  const editorState = useEditorState({
    editor,
    selector: ({ editor }) => {
      return {
        isActive: editor?.isActive('strike')
      }
    }
  })

  // Template
  return (
    <TooltipButton
      Icon={StrikethroughIcon}
      isActive={editorState?.isActive}
      kbd='Ctrl Shift S'
      label='Strike'
      onClick={() => editor?.chain().focus().toggleStrike().run()}
    />
  )
}
