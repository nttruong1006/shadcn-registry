import { useCurrentEditor, useEditorState } from '@tiptap/react'
import { BoldIcon } from 'lucide-react'
import TooltipButton from './tooltip-button'

export default function BoldButton() {
  const { editor } = useCurrentEditor()
  const editorState = useEditorState({
    editor,
    selector: ({ editor }) => {
      return {
        isActive: editor?.isActive('bold')
      }
    }
  })

  // Template
  return (
    <TooltipButton
      Icon={BoldIcon}
      isActive={editorState?.isActive}
      kbd='Ctrl B'
      label='Bold'
      onClick={() => editor?.chain().focus().toggleBold().run()}
    />
  )
}
