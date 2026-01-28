import type { Level } from '@tiptap/extension-heading'
import { useCurrentEditor, useEditorState } from '@tiptap/react'
import { ChevronDownIcon, TypeIcon } from 'lucide-react'
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

// Text styles
const textStyles: Array<{
  label: string
  level: Level | null
  shortcut: string
}> = [
  {
    label: 'Normal text',
    level: null,
    shortcut: 'Ctrl Alt 0'
  },
  {
    label: 'Heading 1',
    level: 1,
    shortcut: 'Ctrl Alt 1'
  },
  {
    label: 'Heading 2',
    level: 2,
    shortcut: 'Ctrl Alt 2'
  },
  {
    label: 'Heading 3',
    level: 3,
    shortcut: 'Ctrl Alt 3'
  },
  {
    label: 'Heading 4',
    level: 4,
    shortcut: 'Ctrl Alt 4'
  }
]

// Component
const TextStyleButton = memo(() => {
  // Hooks
  const { editor } = useCurrentEditor()
  const editorState = useEditorState({
    editor,
    selector: ({ editor }) => {
      return {
        isActive: {
          null: editor?.isActive('paragraph'),
          1: editor?.isActive('heading', { level: 1 }),
          2: editor?.isActive('heading', { level: 2 }),
          3: editor?.isActive('heading', { level: 3 }),
          4: editor?.isActive('heading', { level: 4 }),
          5: editor?.isActive('heading', { level: 5 }),
          6: editor?.isActive('heading', { level: 6 })
        }
      }
    }
  })

  // Methods
  const changeTextStyle = (textStyle: (typeof textStyles)[number]) => {
    const { level } = textStyle
    if (level) {
      editor?.chain().focus().toggleHeading({ level }).run()
    } else {
      editor?.chain().focus().setParagraph().run()
    }
  }

  // Template
  return (
    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <Button className='gap-1' variant='ghost'>
              <TypeIcon />
              <ChevronDownIcon />
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>

        <TooltipContent>Text style</TooltipContent>
      </Tooltip>

      <DropdownMenuContent>
        {textStyles.map((textStyle) => (
          <DropdownMenuItem
            className={cn({
              'bg-accent text-accent-foreground': editorState?.isActive[`${textStyle.level}`]
            })}
            key={textStyle.level}
            onClick={() => changeTextStyle(textStyle)}
          >
            <span>{textStyle.label}</span>
            <DropdownMenuShortcut>{textStyle.shortcut}</DropdownMenuShortcut>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
})

TextStyleButton.displayName = 'TextStyleButton'
export default TextStyleButton
