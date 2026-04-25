import type { Level } from '@tiptap/extension-heading'
import { useEditorState } from '@tiptap/react'
import { ChevronDownIcon, TypeIcon } from 'lucide-react'
import { Button } from '@/components/atoms/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from '@/components/atoms/dropdown-menu'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/atoms/tooltip'
import { cn } from '@/utils/ui'
import { useInternalEditor } from './lib'

const textStyles: Array<{
  label: string
  level: Level | null
  shortcut: string
}> = [
  {
    label: 'Normal',
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

export default function TextStyleButton() {
  const editor = useInternalEditor()
  const editorState = useEditorState({
    editor,
    selector: ({ editor }) => {
      return {
        isActive: {
          null: editor.isActive('paragraph'),
          1: editor.isActive('heading', { level: 1 }),
          2: editor.isActive('heading', { level: 2 }),
          3: editor.isActive('heading', { level: 3 }),
          4: editor.isActive('heading', { level: 4 }),
          5: editor.isActive('heading', { level: 5 }),
          6: editor.isActive('heading', { level: 6 })
        },
        isEditable: editor.isEditable
      }
    }
  })

  function changeTextStyle(textStyle: (typeof textStyles)[number]) {
    const { level } = textStyle
    if (level) {
      editor.chain().focus().toggleHeading({ level }).run()
    } else {
      editor.chain().focus().setParagraph().run()
    }
  }

  return (
    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger
          render={
            <DropdownMenuTrigger
              render={
                <Button className='gap-1' disabled={!editorState.isEditable} variant='ghost'>
                  <TypeIcon />
                  <ChevronDownIcon />
                </Button>
              }
            />
          }
        />
        <TooltipContent>Text style</TooltipContent>
      </Tooltip>

      <DropdownMenuContent>
        <DropdownMenuGroup>
          {textStyles.map((textStyle) => {
            const isActive = editorState?.isActive[`${textStyle.level}`]
            return (
              <DropdownMenuItem
                className={cn({
                  'bg-accent text-accent-foreground': isActive
                })}
                key={textStyle.level}
                onClick={() => changeTextStyle(textStyle)}
              >
                <span>{textStyle.label}</span>
                <DropdownMenuShortcut className={cn({ 'text-accent-foreground': isActive })}>
                  {textStyle.shortcut}
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            )
          })}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
