import { useCurrentEditor, useEditorState } from '@tiptap/react'
import { ItalicIcon } from 'lucide-react'
import TooltipButton from './tooltip-button'

export default function ItalicButton() {
  const { editor } = useCurrentEditor()
  const editorState = useEditorState({
    editor,
    selector: ({ editor }) => {
      return {
        isActive: editor?.isActive('italic')
      }
    }
  })

  return (
    <TooltipButton
      Icon={ItalicIcon}
      isActive={editorState?.isActive}
      kbd='Ctrl I'
      label='Italic'
      onClick={() => editor?.chain().focus().toggleItalic().run()}
    />
  )
}
