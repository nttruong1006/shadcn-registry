import { useCurrentEditor, useEditorState } from '@tiptap/react'
import { StrikethroughIcon } from 'lucide-react'
import { memo } from 'react'
import TooltipButton from './tooltip-button'

// Component
const StrikeButton = memo(() => {
  // Hooks
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
})

StrikeButton.displayName = 'StrikeButton'
export default StrikeButton
