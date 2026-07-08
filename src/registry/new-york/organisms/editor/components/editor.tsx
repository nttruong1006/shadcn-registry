import { Placeholder } from '@tiptap/extensions'
import {
  type Content,
  type Extensions,
  EditorContext as TiptapEditorContext,
  type UseEditorOptions,
  useEditor
} from '@tiptap/react'
import throttle from 'lodash.throttle'
import { type Dispatch, type RefObject, type SetStateAction, useMemo, useRef, useState } from 'react'
import { Spinner } from '@/components/atoms/spinner'
import BlockquoteButton from './blockquote-button'
import BoldButton from './bold-button'
import FileButton from './file-button'
import HighlightButton from './highlight-button'
import HistoryButtons from './history-buttons'
import ImageButton from './image-button'
import InternalEditorContent from './internal-editor-content'
import ItalicButton from './italic-button'
import { defaultExtensions, getEditorValue } from './lib'
import LinkButton from './link-button'
import ListButton from './list-button'
import PreviewButton from './preview-button'
import StrikeButton from './strike-button'
import TableButton from './table-button'
import TextAlignButton from './text-align-button'
import TextColorButton from './text-color-button'
import TextStyleButton from './text-style-button'
import ToolbarSeparator from './toolbar-separator'
import UnderlineButton from './underline-button'
import YoutubeButton from './youtube-button'
import ZoomButton from './zoom-button'

export type EditorProps = UseEditorOptions & {
  id: string
  value: Content
  placeholder?: string
  onValueChange: (value: Content) => void
}

export type CallbackRef = RefObject<((editor: ReturnType<typeof useEditor>) => void) | null>

export type SetExtensions = Dispatch<SetStateAction<Extensions>>

export function Editor({ id, value, placeholder, editable = true, onValueChange, ...props }: EditorProps) {
  const callbackRef = useRef<CallbackRef['current']>(null)
  const [extensions, setExtensions] = useState<Extensions>(() => [
    ...defaultExtensions,
    Placeholder.configure({
      placeholder
    })
  ])

  const editor = useEditor(
    {
      editable,
      editorProps: {
        attributes: {
          autocapitalize: 'off',
          autocomplete: 'off',
          autocorrect: 'off'
        }
      },
      extensions,
      immediatelyRender: false,
      onBlur: ({ editor }) => {
        onValueChange(getEditorValue(editor, 'html'))
      },
      onCreate: ({ editor }) => {
        if (value && editor.isEmpty) {
          editor.commands.setContent(value)
        }
        callbackRef.current?.(editor)
        callbackRef.current = null
      },
      onUpdate: useMemo(
        () =>
          throttle(
            ({ editor }) => {
              onValueChange(getEditorValue(editor, 'html'))
            },
            1000,
            {
              trailing: false
            }
          ),
        [onValueChange]
      ),
      ...props
    },
    [editable, extensions]
  )

  if (!editor) {
    return <Spinner className='mx-auto size-6' />
  }

  return (
    <TiptapEditorContext value={{ editor }}>
      <div
        className='w-full transition-all [&_.tiptap]:max-h-[500px] [&_.tiptap]:min-h-64 [&_.tiptap]:overflow-auto [&_.tiptap]:border-none [&_.tiptap]:p-6 [&_.tiptap]:outline-none'
        id={`editor-${id}`}
      >
        <div
          aria-disabled={!editable}
          className='rounded-lg border border-input bg-transparent text-foreground ring-offset-background transition-[color,box-shadow] placeholder:text-muted-foreground has-[.ProseMirror-focused]:border-ring has-[.ProseMirror-focused]:ring-[3px] has-[.ProseMirror-focused]:ring-ring/50 aria-disabled:bg-input/50 aria-disabled:opacity-50 group-data-[invalid=true]/field:border-destructive group-data-[invalid=true]/field:ring-3 group-data-[invalid=true]/field:ring-destructive/20 dark:group-data-[invalid=true]/field:border-destructive/50 dark:group-data-[invalid=true]/field:ring-destructive/40 dark:aria-disabled:bg-input/80'
        >
          <div className='flex flex-wrap items-center gap-1 border-input border-b p-4'>
            <HistoryButtons />
            <ToolbarSeparator />

            <BoldButton />
            <ItalicButton />
            <UnderlineButton />
            <StrikeButton />
            <BlockquoteButton />
            <ToolbarSeparator />

            <TextStyleButton />
            <TextAlignButton callbackRef={callbackRef} setExtensions={setExtensions} />
            <TextColorButton />
            <HighlightButton />
            <ToolbarSeparator />

            <LinkButton id={id} />
            <ListButton />
            <TableButton callbackRef={callbackRef} setExtensions={setExtensions} />
            <YoutubeButton callbackRef={callbackRef} id={id} setExtensions={setExtensions} />
            <ImageButton id={id} />
            <FileButton id={id} />
            <ToolbarSeparator />

            <ZoomButton id={id} />
            <PreviewButton value={value} />
          </div>

          <InternalEditorContent />
        </div>
      </div>
    </TiptapEditorContext>
  )
}
