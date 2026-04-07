import { useCurrentEditor, useEditorState } from '@tiptap/react'
import { UnderlineIcon } from 'lucide-react'
import TooltipButton from './tooltip-button'

export default function UnderlineButton() {
  const { editor } = useCurrentEditor()
  const editorState = useEditorState({
    editor,
    selector: ({ editor }) => {
      return {
        isActive: editor?.isActive('underline')
      }
    }
  })

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
}
