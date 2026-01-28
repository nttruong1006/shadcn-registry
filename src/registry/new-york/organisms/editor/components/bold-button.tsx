import { useCurrentEditor, useEditorState } from '@tiptap/react'
import { BoldIcon } from 'lucide-react'
import { memo } from 'react'
import TooltipButton from './tooltip-button'

// Component
const BoldButton = memo(() => {
  // Hooks
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
})

BoldButton.displayName = 'BoldButton'
export default BoldButton
