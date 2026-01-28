import { useCurrentEditor, useEditorState } from '@tiptap/react'
import { ItalicIcon } from 'lucide-react'
import { memo } from 'react'
import TooltipButton from './tooltip-button'

// Component
const ItalicButton = memo(() => {
  // Hooks
  const { editor } = useCurrentEditor()
  const editorState = useEditorState({
    editor,
    selector: ({ editor }) => {
      return {
        isActive: editor?.isActive('italic')
      }
    }
  })

  // Template
  return (
    <TooltipButton
      Icon={ItalicIcon}
      isActive={editorState?.isActive}
      kbd='Ctrl I'
      label='Italic'
      onClick={() => editor?.chain().focus().toggleItalic().run()}
    />
  )
})

ItalicButton.displayName = 'ItalicButton'
export default ItalicButton
