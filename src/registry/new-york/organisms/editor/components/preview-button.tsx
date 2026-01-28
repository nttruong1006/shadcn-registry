import { type Content, useCurrentEditor, useEditorState } from '@tiptap/react'
import { EyeIcon } from 'lucide-react'
import { memo } from 'react'
import { Button } from '@/registry/new-york/ui/button/components/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/registry/new-york/ui/dialog/components/dialog'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/registry/new-york/ui/tooltip/components/tooltip'
import { EditorContent } from './editor-content'

// Component
const PreviewButton = memo<{ value: Content }>(({ value }) => {
  // Hooks
  const { editor } = useCurrentEditor()
  const editorState = useEditorState({
    editor,
    selector: ({ editor }) => {
      return {
        isEmpty: editor?.isEmpty
      }
    }
  })

  // Template
  return (
    <Dialog>
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            <Button disabled={editorState?.isEmpty} size='icon' variant='ghost'>
              <EyeIcon />
            </Button>
          </DialogTrigger>
        </TooltipTrigger>

        <TooltipContent>Preview</TooltipContent>
      </Tooltip>

      <DialogContent aria-describedby={undefined} className='max-w-[calc(100dvw-3rem)]'>
        <DialogHeader>
          <DialogTitle>Preview the display content</DialogTitle>
        </DialogHeader>

        <main>
          <EditorContent content={value} />
        </main>
      </DialogContent>
    </Dialog>
  )
})

PreviewButton.displayName = 'PreviewButton'
export default PreviewButton
