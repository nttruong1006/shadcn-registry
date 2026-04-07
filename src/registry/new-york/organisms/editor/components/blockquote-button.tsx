import { useCurrentEditor, useEditorState } from '@tiptap/react'
import { QuoteIcon } from 'lucide-react'
import TooltipButton from './tooltip-button'

export default function BlockquoteButton() {
  const { editor } = useCurrentEditor()
  const editorState = useEditorState({
    editor,
    selector: ({ editor }) => {
      return {
        isActive: editor?.isActive('blockquote')
      }
    }
  })

  return (
    <TooltipButton
      Icon={QuoteIcon}
      isActive={editorState?.isActive}
      kbd='Ctrl Shift B'
      label='Blockquote'
      onClick={() => editor?.chain().focus().toggleBlockquote().run()}
    />
  )
}
