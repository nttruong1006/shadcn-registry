import { useCurrentEditor, useEditorState } from '@tiptap/react'
import { QuoteIcon } from 'lucide-react'
import { memo } from 'react'
import TooltipButton from './tooltip-button'

// Component
const BlockquoteButton = memo(() => {
  // Hooks
  const { editor } = useCurrentEditor()
  const editorState = useEditorState({
    editor,
    selector: ({ editor }) => {
      return {
        isActive: editor?.isActive('blockquote')
      }
    }
  })

  // Template
  return (
    <TooltipButton
      Icon={QuoteIcon}
      isActive={editorState?.isActive}
      kbd='Ctrl Shift B'
      label='Blockquote'
      onClick={() => editor?.chain().focus().toggleBlockquote().run()}
    />
  )
})

BlockquoteButton.displayName = 'BlockquoteButton'
export default BlockquoteButton
