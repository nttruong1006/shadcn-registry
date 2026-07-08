import { useEditorState } from '@tiptap/react'
import { ItalicIcon } from 'lucide-react'
import { useInternalEditor } from './lib'
import TooltipButton from './tooltip-button'

export default function ItalicButton() {
  const editor = useInternalEditor()
  const editorState = useEditorState({
    editor,
    selector: ({ editor }) => ({
      isActive: editor.isActive('italic'),
      isEditable: editor.isEditable && editor.can().toggleItalic()
    })
  })

  return (
    <TooltipButton
      disabled={!editorState.isEditable}
      Icon={ItalicIcon}
      isActive={editorState.isActive}
      kbd='Ctrl I'
      label='Italic'
      onClick={() => editor.chain().focus().toggleItalic().run()}
    />
  )
}
