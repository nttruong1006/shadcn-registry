import {
  type CommandProps,
  mergeAttributes,
  Node,
  NodeViewWrapper,
  type ReactNodeViewProps,
  ReactNodeViewRenderer,
  useCurrentEditor
} from '@tiptap/react'
import { PaperclipIcon, TrashIcon } from 'lucide-react'
import type { MouseEvent } from 'react'
import type { FileAttributes } from '@/@types/tiptap'
import { Button } from '@/components/atoms/button'
import { getSizeText } from '@/components/molecules/file-upload/lib'

function FileComponent({ node, deleteNode }: ReactNodeViewProps<HTMLAnchorElement>) {
  const nodeAttrs = node.attrs as FileAttributes

  const { editor } = useCurrentEditor()

  function deleteFile(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    e.stopPropagation()
    deleteNode()
    editor?.commands.focus()
  }

  return (
    <NodeViewWrapper>
      <a
        className='flex w-full items-center gap-4 rounded-md border p-4 transition-colors duration-200 hover:bg-gray-200 hover:no-underline'
        href={nodeAttrs.url}
        rel='noreferrer'
        target='_blank'
      >
        <PaperclipIcon className='size-4' />

        <div className='grow space-y-2 overflow-hidden'>
          <div className='line-clamp-1'>{nodeAttrs.name}</div>
          <div>{getSizeText(nodeAttrs.size)}</div>
        </div>

        <Button onClick={deleteFile} size='icon' variant='ghost'>
          <TrashIcon />
        </Button>
      </a>
    </NodeViewWrapper>
  )
}

const FileExtension = Node.create({
  addAttributes() {
    return {
      mime: {
        default: null
      },
      name: {
        default: null
      },
      size: {
        default: 0
      },
      url: {
        default: null
      }
    }
  },
  // @ts-expect-error - tiptap custom command not in core type definitions
  addCommands() {
    return {
      insertFile:
        (options: FileAttributes) =>
        ({ commands }: CommandProps) =>
          commands.insertContent({
            attrs: {
              ...options
            },
            type: this.name
          })
    }
  },
  addNodeView() {
    return ReactNodeViewRenderer(FileComponent)
  },
  addOptions() {
    return {
      HTMLAttributes: {
        rel: 'noreferrer',
        target: '_blank'
      }
    }
  },
  draggable: true,
  group: 'block',
  name: 'file',
  parseHTML() {
    return [
      {
        tag: 'a'
      }
    ]
  },
  renderHTML({ HTMLAttributes }) {
    const { url, name, size } = HTMLAttributes as FileAttributes

    return [
      'a',
      mergeAttributes(this.options.HTMLAttributes, {
        class:
          'flex items-center gap-4 rounded-md border p-4 transition-colors duration-200 hover:bg-gray-200 hover:no-underline',
        href: url
      }),
      [
        'svg',
        {
          class: 'lucide lucide-paperclip-icon lucide-paperclip size-4',
          fill: 'none',
          height: '24',
          stroke: 'currentColor',
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
          'stroke-width': '2',
          viewBox: '0 0 24 24',
          width: '24',
          xmlns: 'http://www.w3.org/2000/svg'
        },
        [
          'path',
          {
            d: 'm16 6-8.414 8.586a2 2 0 0 0 2.829 2.829l8.414-8.586a4 4 0 1 0-5.657-5.657l-8.379 8.551a6 6 0 1 0 8.485 8.485l8.379-8.551'
          }
        ]
      ],
      [
        'div',
        {
          class: 'space-y-2'
        },
        ['div', name],
        ['div', getSizeText(size)]
      ]
    ]
  },
  selectable: true
})

export default FileExtension
