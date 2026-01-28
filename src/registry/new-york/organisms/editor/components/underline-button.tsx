import { useCurrentEditor, useEditorState } from '@tiptap/react'
import { UnderlineIcon } from 'lucide-react'
import { memo } from 'react'
import TooltipButton from './tooltip-button'

// Component
const UnderlineButton = memo(() => {
  // Hooks
  const { editor } = useCurrentEditor()
  const editorState = useEditorState({
    editor,
    selector: ({ editor }) => {
      return {
        isActive: editor?.isActive('underline')
      }
    }
  })

  // Template
  return (
    <TooltipButton
      Icon={UnderlineIcon}
      isActive={editorState?.isActive}
      kbd='Ctrl U'
      label='Underline'
      name='underline'
      onClick={() => editor?.chain().focus().toggleUnderline().run()}
    />
  )
})

UnderlineButton.displayName = 'UnderlineButton'
export default UnderlineButton
