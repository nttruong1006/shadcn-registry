import { type Content, useEditorState } from '@tiptap/react'
import { EyeIcon } from 'lucide-react'
import { Button } from '@/components/atoms/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/atoms/dialog'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/atoms/tooltip'
import { EditorContent } from './editor-content'
import { useInternalEditor } from './lib'

export default function PreviewButton({ value }: { value: Content }) {
  const editor = useInternalEditor()
  const editorState = useEditorState({
    editor,
    selector: ({ editor }) => ({
      isEmpty: editor.isEmpty
    })
  })

  return (
    <Dialog>
      <Tooltip>
        <TooltipTrigger
          render={
            <DialogTrigger
              render={
                <Button disabled={editorState.isEmpty} size='icon' variant='ghost'>
                  <EyeIcon />
                </Button>
              }
            />
          }
        />
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
}
