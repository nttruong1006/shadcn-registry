import Image from '@tiptap/extension-image'
import {
  mergeAttributes,
  NodeViewWrapper,
  type ReactNodeViewProps,
  ReactNodeViewRenderer,
  useCurrentEditor
} from '@tiptap/react'
import { AlignLeftIcon, ChevronDownIcon, TrashIcon } from 'lucide-react'
import { type CSSProperties, type ImgHTMLAttributes, type PointerEvent, useRef, useState } from 'react'
import { Button } from '@/registry/new-york/ui/button/components/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/registry/new-york/ui/dropdown-menu/components/dropdown-menu'
import { Popover, PopoverContent, PopoverTrigger } from '@/registry/new-york/ui/popover/components/popover'
import { Separator } from '@/registry/new-york/ui/separator/components/separator'
import { Skeleton } from '@/registry/new-york/ui/skeleton/components/skeleton'
import { cn } from '@/utils/ui'
import { type Alignment, alignments, containerClassNamePerAlignment, minWidth } from './lib'

// Image attributes
type ImageAttributes = Pick<ImgHTMLAttributes<HTMLImageElement>, 'alt' | 'height' | 'src' | 'title' | 'width'> & {
  alignment: Alignment
  containerStyle: CSSProperties
}

// Resizing position
type ResizingPosition = 'left' | 'right'

// Base resize handler class name
const BASE_RESIZE_HANDLER_CLASS_NAME =
  'invisible absolute top-0 bottom-0 cursor-ew-resize px-2 transition-[visibility_width] group-hover:visible before:absolute before:top-1/2 before:h-1/2 before:max-h-36 before:w-1 before:-translate-y-1/2 before:rounded-md before:bg-muted before:border-muted-foreground before:content-[""]'

// Component
const ImageComponent = ({ node, updateAttributes, deleteNode }: ReactNodeViewProps<HTMLImageElement>) => {
  // Props
  const { alignment, containerStyle, ...imageAttributes } = node.attrs as ImageAttributes

  // Hooks
  const { editor } = useCurrentEditor()

  // Refs
  const containerRef = useRef<HTMLDivElement>(null)

  // States
  const [isLoaded, setIsLoaded] = useState(false)
  const [isOpenPopover, setIsOpenPopover] = useState(false)

  // Methods
  const loadImage = () => {
    setIsLoaded(true)
  }

  const changeAlignment = (alignment: Alignment) => {
    // Update alignment
    updateAttributes({
      alignment
    })

    // Update width (full) if alignment is justify
    if (alignment === 'justify') {
      updateAttributes({
        width: containerRef.current?.clientWidth,
        containerStyle: {
          ...containerStyle,
          width: '100%'
        }
      })
    }

    // Focus editor
    editor?.commands.focus()
  }

  const downPointer = (pointerDownEvent: PointerEvent<HTMLDivElement>, position: ResizingPosition) => {
    pointerDownEvent.preventDefault()
    pointerDownEvent.stopPropagation()

    // Handle move pointer
    const handleMovePointer = (pointerMoveEvent: MouseEvent) => {
      pointerMoveEvent.preventDefault()
      pointerMoveEvent.stopPropagation()

      const containerWidth = containerRef.current?.clientWidth ?? 0
      const deltaX =
        (position === 'left'
          ? pointerDownEvent.clientX - pointerMoveEvent.clientX
          : pointerMoveEvent.clientX - pointerDownEvent.clientX) * 2
      const newWidth = Math.round(
        Math.max(minWidth, Math.min(containerWidth, (imageAttributes.width as number) + deltaX))
      )

      updateAttributes({
        width: newWidth,
        containerStyle: {
          ...containerStyle,
          width: `${Math.round((newWidth * 100) / containerWidth)}%`
        }
      })
    }

    // Handle up pointer
    const handleUpPointer = (pointerUpEvent: MouseEvent) => {
      pointerUpEvent.preventDefault()
      pointerUpEvent.stopPropagation()

      editor?.commands.focus()

      document.removeEventListener('pointermove', handleMovePointer)
      document.removeEventListener('pointerup', handleUpPointer)
    }

    document.addEventListener('pointermove', handleMovePointer)
    document.addEventListener('pointerup', handleUpPointer)
  }

  const deleteImage = () => {
    deleteNode()
    editor?.commands.focus()
  }

  // Template
  return (
    <NodeViewWrapper data-drag-handle>
      <div className={cn('flex', containerClassNamePerAlignment[alignment])} ref={containerRef}>
        <div className='group relative transition-all' style={containerStyle}>
          {!isLoaded && <Skeleton className='absolute inset-0 rounded-md' />}

          <Popover onOpenChange={setIsOpenPopover} open={isOpenPopover}>
            <PopoverTrigger className='w-full'>
              {/** biome-ignore lint/correctness/useImageSize:ignore */}
              {/** biome-ignore lint/a11y/noNoninteractiveElementInteractions: ignore */}
              <img
                {...imageAttributes}
                alt='Alt'
                className={cn(
                  'peer pointer-events-none w-full object-contain opacity-0 outline-2 outline-transparent outline-offset-2 transition-all',
                  {
                    'outline-inherit': isOpenPopover,
                    'pointer-events-auto opacity-100': isLoaded
                  }
                )}
                onLoad={loadImage}
              />
            </PopoverTrigger>

            <PopoverContent className='space-y-4' side='top'>
              <div className='flex gap-2'>
                {/* Alignment */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant='outline'>
                      <AlignLeftIcon />
                      <ChevronDownIcon />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent>
                    {alignments.map((alignmentOption) => (
                      <DropdownMenuItem
                        className={cn({
                          'bg-accent': alignment === alignmentOption.value
                        })}
                        key={alignmentOption.value}
                        onClick={() => changeAlignment(alignmentOption.value)}
                      >
                        <alignmentOption.icon />
                        <span>{alignmentOption.label}</span>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                <Separator className='h-10' orientation='vertical' />

                {/* Trash */}
                <Button onClick={deleteImage} size='icon' variant='outline'>
                  <TrashIcon />
                </Button>
              </div>
            </PopoverContent>
          </Popover>

          <div
            className={cn('left-1 before:left-1.5', BASE_RESIZE_HANDLER_CLASS_NAME)}
            onPointerDown={(e) => downPointer(e, 'left')}
          />

          <div
            className={cn('right-1 before:right-1.5', BASE_RESIZE_HANDLER_CLASS_NAME)}
            onPointerDown={(e) => downPointer(e, 'right')}
          />
        </div>
      </div>
    </NodeViewWrapper>
  )
}

// Extension
const CustomImageExtension = Image.extend({
  renderHTML({ HTMLAttributes }) {
    const { alignment, containerStyle, ...imageAttributes } = HTMLAttributes as ImageAttributes
    return [
      'div',
      {
        class: cn('flex', containerClassNamePerAlignment[alignment])
      },
      [
        'div',
        {
          style: Object.entries(containerStyle)
            .map(([key, value]) => `${key}: ${value}`)
            .join(';')
        },
        [
          'img',
          {
            ...mergeAttributes(imageAttributes),
            class: 'w-full object-contain rounded-md'
          }
        ]
      ]
    ]
  },
  addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        default: minWidth
      },
      alignment: {
        default: 'center'
      },
      containerStyle: {
        default: {
          width: `${minWidth}px`
        }
      }
    }
  },
  addNodeView() {
    return ReactNodeViewRenderer(ImageComponent)
  }
})

export default CustomImageExtension
