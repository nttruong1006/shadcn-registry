import Youtube from '@tiptap/extension-youtube'
import {
  mergeAttributes,
  NodeViewWrapper,
  type ReactNodeViewProps,
  ReactNodeViewRenderer,
  useCurrentEditor
} from '@tiptap/react'
import { AlignLeftIcon, ChevronDownIcon, MoveHorizontalIcon, TrashIcon } from 'lucide-react'
import { type CSSProperties, type IframeHTMLAttributes, useRef, useState } from 'react'
import { Button } from '@/components/atoms/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/atoms/dropdown-menu'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/atoms/popover'
import { Separator } from '@/components/atoms/separator'
import { Skeleton } from '@/components/atoms/skeleton'
import { cn } from '@/utils/ui'
import { type Alignment, alignments, containerClassNamePerAlignment, isValidYoutubeUrl, minWidth } from './lib'

type YoutubeAttributes = IframeHTMLAttributes<HTMLIFrameElement> & {
  alignment: Alignment
  containerStyle: CSSProperties
}

const widthSizes: string[] = ['25%', '50%', '75%', '100%']

function getYoutubeEmbedUrl(nocookie?: boolean, isPlaylist?: boolean) {
  if (isPlaylist) {
    return 'https://www.youtube-nocookie.com/embed/videoseries?list='
  }
  return nocookie ? 'https://www.youtube-nocookie.com/embed/' : 'https://www.youtube.com/embed/'
}

function getEmbedUrlFromYoutubeUrl(options: {
  url: string
  allowFullscreen?: boolean
  autoplay?: boolean
  ccLanguage?: string
  ccLoadPolicy?: boolean
  controls?: boolean
  disableKBcontrols?: boolean
  enableIFrameApi?: boolean
  endTime?: number
  interfaceLanguage?: string
  ivLoadPolicy?: number
  loop?: boolean
  modestBranding?: boolean
  nocookie?: boolean
  origin?: string
  playlist?: string
  progressBarColor?: string
  startAt?: number
  rel?: number
}) {
  const {
    url,
    allowFullscreen,
    autoplay,
    ccLanguage,
    ccLoadPolicy,
    controls,
    disableKBcontrols,
    enableIFrameApi,
    endTime,
    interfaceLanguage,
    ivLoadPolicy,
    loop,
    modestBranding,
    nocookie,
    origin,
    playlist,
    progressBarColor,
    startAt,
    rel
  } = options

  if (!isValidYoutubeUrl(url)) {
    return null
  }

  // If is already an embed url, return it
  if (url.includes('/embed/')) {
    return url
  }

  // If is a youtu.be url, get the id after the /
  if (url.includes('youtu.be')) {
    const id = url.split('/').pop()

    if (!id) {
      return null
    }
    return `${getYoutubeEmbedUrl(nocookie)}${id}`
  }

  const videoIdRegex = /(?:(v|list)=|shorts\/)([-\w]+)/gm
  const matches = videoIdRegex.exec(url)

  if (!matches?.[2]) {
    return null
  }

  let outputUrl = `${getYoutubeEmbedUrl(nocookie, matches[1] === 'list')}${matches[2]}`

  const params: string[] = []

  if (allowFullscreen === false) {
    params.push('fs=0')
  }

  if (autoplay) {
    params.push('autoplay=1')
  }

  if (ccLanguage) {
    params.push(`cc_lang_pref=${ccLanguage}`)
  }

  if (ccLoadPolicy) {
    params.push('cc_load_policy=1')
  }

  if (!controls) {
    params.push('controls=0')
  }

  if (disableKBcontrols) {
    params.push('disablekb=1')
  }

  if (enableIFrameApi) {
    params.push('enablejsapi=1')
  }

  if (endTime) {
    params.push(`end=${endTime}`)
  }

  if (interfaceLanguage) {
    params.push(`hl=${interfaceLanguage}`)
  }

  if (ivLoadPolicy) {
    params.push(`iv_load_policy=${ivLoadPolicy}`)
  }

  if (loop) {
    params.push('loop=1')
  }

  if (modestBranding) {
    params.push('modestbranding=1')
  }

  if (origin) {
    params.push(`origin=${origin}`)
  }

  if (playlist) {
    params.push(`playlist=${playlist}`)
  }

  if (startAt) {
    params.push(`start=${startAt}`)
  }

  if (progressBarColor) {
    params.push(`color=${progressBarColor}`)
  }

  if (rel !== undefined) {
    params.push(`rel=${rel}`)
  }

  if (params.length) {
    outputUrl += `${matches[1] === 'v' ? '?' : '&'}${params.join('&')}`
  }

  return outputUrl
}

function YoutubeComponent(props: ReactNodeViewProps<HTMLImageElement>) {
  const { node, updateAttributes, deleteNode } = props
  const { alignment, containerStyle, ...youtubeAttributes } = node.attrs as YoutubeAttributes

  const { editor } = useCurrentEditor()

  const containerRef = useRef<HTMLDivElement>(null)
  const [src] = useState(
    () =>
      getEmbedUrlFromYoutubeUrl({
        nocookie: true,
        url: youtubeAttributes.src as string
      }) ?? undefined
  )
  const [loaded, setLoaded] = useState(false)
  const [openPopover, setOpenPopover] = useState(false)

  function loadVideo() {
    setLoaded(true)
  }

  function changeAlignment(alignment: Alignment) {
    updateAttributes({
      alignment
    })

    if (alignment === 'justify') {
      updateAttributes({
        containerStyle: {
          ...containerStyle,
          width: '100%'
        },
        width: containerRef.current?.clientWidth
      })
    }

    // Focus editor
    editor?.commands.focus()
  }

  function changeWidthSize(size: string) {
    updateAttributes({
      containerStyle: {
        ...containerStyle,
        width: size
      }
    })
    editor?.commands.focus()
  }

  function deleteVideo() {
    deleteNode()
    editor?.commands.focus()
  }

  return (
    <NodeViewWrapper data-drag-handle>
      <div className={cn('flex', containerClassNamePerAlignment[alignment])} ref={containerRef}>
        <Popover onOpenChange={setOpenPopover} open={openPopover}>
          <PopoverTrigger
            className={cn('group relative aspect-video rounded-md border p-6 transition-all', {
              'border-primary': openPopover,
              'pointer-events-auto opacity-100': loaded
            })}
            style={containerStyle}
          >
            {!loaded && <Skeleton className='pointer-events-none absolute inset-0 rounded-md' />}

            {/** biome-ignore lint/a11y/noNoninteractiveElementInteractions: ignore */}
            <iframe
              allowFullScreen={false}
              className='size-full rounded-md object-contain'
              height={youtubeAttributes.height}
              onLoad={loadVideo}
              src={src}
              title='custom-youtube-extension'
              width={youtubeAttributes.width}
            />
          </PopoverTrigger>

          <PopoverContent className='space-y-4' side='top'>
            <div className='flex gap-2'>
              {/* Alignment */}
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <Button variant='outline'>
                      <AlignLeftIcon />
                      <ChevronDownIcon />
                    </Button>
                  }
                />

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

              {/* Width size */}
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <Button variant='outline'>
                      <MoveHorizontalIcon />
                      <ChevronDownIcon />
                    </Button>
                  }
                />

                <DropdownMenuContent>
                  {widthSizes.map((size) => (
                    <DropdownMenuItem
                      className={cn({
                        'bg-accent': containerStyle.width === size
                      })}
                      key={size}
                      onClick={() => changeWidthSize(size)}
                    >
                      {size}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <Separator className='h-10' orientation='vertical' />

              {/* Trash */}
              <Button onClick={deleteVideo} size='icon' variant='outline'>
                <TrashIcon />
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </NodeViewWrapper>
  )
}

const CustomYoutubeExtension = Youtube.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
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
    return ReactNodeViewRenderer(YoutubeComponent)
  },
  renderHTML({ HTMLAttributes }) {
    const { alignment, containerStyle, ...youtubeAttributes } = HTMLAttributes as YoutubeAttributes

    const embedUrl = getEmbedUrlFromYoutubeUrl({
      allowFullscreen: this.options.allowFullscreen,
      autoplay: this.options.autoplay,
      ccLanguage: this.options.ccLanguage,
      ccLoadPolicy: this.options.ccLoadPolicy,
      controls: this.options.controls,
      disableKBcontrols: this.options.disableKBcontrols,
      enableIFrameApi: this.options.enableIFrameApi,
      endTime: this.options.endTime,
      interfaceLanguage: this.options.interfaceLanguage,
      ivLoadPolicy: this.options.ivLoadPolicy,
      loop: this.options.loop,
      modestBranding: this.options.modestBranding,
      nocookie: this.options.nocookie,
      origin: this.options.origin,
      playlist: this.options.playlist,
      progressBarColor: this.options.progressBarColor,
      rel: this.options.rel,
      startAt: HTMLAttributes.start || 0,
      url: HTMLAttributes.src
    })

    if (embedUrl) {
      youtubeAttributes.src = embedUrl
    }

    return [
      'div',
      {
        class: cn('flex', containerClassNamePerAlignment[alignment])
      },
      [
        'div',
        {
          class: 'aspect-video',
          style: Object.entries(containerStyle)
            .map(([key, value]) => `${key}: ${value}`)
            .join(';')
        },
        [
          'iframe',
          {
            ...mergeAttributes(
              this.options.HTMLAttributes,
              {
                allowfullscreen: this.options.allowFullscreen,
                autoplay: this.options.autoplay,
                ccLanguage: this.options.ccLanguage,
                ccLoadPolicy: this.options.ccLoadPolicy,
                disableKBcontrols: this.options.disableKBcontrols,
                enableIFrameApi: this.options.enableIFrameApi,
                endTime: this.options.endTime,
                height: this.options.height,
                interfaceLanguage: this.options.interfaceLanguage,
                ivLoadPolicy: this.options.ivLoadPolicy,
                loop: this.options.loop,
                modestBranding: this.options.modestBranding,
                origin: this.options.origin,
                playlist: this.options.playlist,
                progressBarColor: this.options.progressBarColor,
                rel: this.options.rel,
                width: this.options.width
              },
              youtubeAttributes
            ),
            class: 'size-full rounded-md object-contain'
          }
        ]
      ]
    ]
  }
})

export default CustomYoutubeExtension
