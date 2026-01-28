import { useCurrentEditor, useEditorState } from '@tiptap/react'
import { ChevronDownIcon, ListIcon, ListOrderedIcon, ListTodoIcon } from 'lucide-react'
import { memo } from 'react'
import { Button } from '@/registry/new-york/ui/button/components/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from '@/registry/new-york/ui/dropdown-menu/components/dropdown-menu'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/registry/new-york/ui/tooltip/components/tooltip'
import { cn } from '@/utils/ui'

// Component
const ListButton = memo(() => {
  // Hooks
  const { editor } = useCurrentEditor()
  const editorState = useEditorState({
    editor,
    selector: ({ editor }) => {
      return {
        isBulletListActive: editor?.isActive('bulletList'),
        isOrderedListActive: editor?.isActive('orderedList'),
        isTaskListActive: editor?.isActive('taskList')
      }
    }
  })

  // Template
  return (
    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <Button className='gap-1' variant='ghost'>
              <ListIcon />
              <ChevronDownIcon />
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>

        <TooltipContent>List</TooltipContent>
      </Tooltip>

      <DropdownMenuContent>
        {/* Bullet list */}
        <DropdownMenuItem
          className={cn({
            'bg-accent text-accent-foreground': editorState?.isBulletListActive
          })}
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
        >
          <ListIcon />
          <span>Bullet list</span>
          <DropdownMenuShortcut>Ctrl Shift 8</DropdownMenuShortcut>
        </DropdownMenuItem>

        {/* Ordered list */}
        <DropdownMenuItem
          className={cn({
            'bg-accent text-accent-foreground': editorState?.isOrderedListActive
          })}
          onClick={() => editor?.chain().focus().toggleOrderedList().run()}
        >
          <ListOrderedIcon />
          <span>Ordered list</span>
          <DropdownMenuShortcut>Ctrl Shift 7</DropdownMenuShortcut>
        </DropdownMenuItem>

        {/* Task list */}
        <DropdownMenuItem
          className={cn({
            'bg-accent text-accent-foreground': editorState?.isTaskListActive
          })}
          onClick={() => editor?.chain().focus().toggleTaskList().run()}
        >
          <ListTodoIcon />
          <span>Task list</span>
          <DropdownMenuShortcut>Ctrl Shift 9</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
})

ListButton.displayName = 'ListButton'
export default ListButton
