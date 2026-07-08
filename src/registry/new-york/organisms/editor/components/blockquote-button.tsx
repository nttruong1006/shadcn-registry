import { useEditorState } from '@tiptap/react'
import { QuoteIcon } from 'lucide-react'
import { useInternalEditor } from './lib'
import TooltipButton from './tooltip-button'

export default function BlockquoteButton() {
  const editor = useInternalEditor()
  const editorState = useEditorState({
    editor,
    selector: ({ editor }) => ({
      isActive: editor.isActive('blockquote'),
      isEditable: editor.isEditable && editor.can().toggleBlockquote()
    })
  })

  return (
    <TooltipButton
      disabled={!editorState.isEditable}
      Icon={QuoteIcon}
      isActive={editorState.isActive}
      kbd='Ctrl Shift B'
      label='Blockquote'
      onClick={() => editor.chain().focus().toggleBlockquote().run()}
    />
  )
}
