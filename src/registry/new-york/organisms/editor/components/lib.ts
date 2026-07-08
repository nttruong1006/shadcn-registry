import { Color } from '@tiptap/extension-color'
import Highlight from '@tiptap/extension-highlight'
import { TaskItem, TaskList } from '@tiptap/extension-list'
import { TextStyle } from '@tiptap/extension-text-style'
import { type Editor, useCurrentEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { AlignCenter, AlignJustify, AlignLeft, AlignRight, type LucideProps } from 'lucide-react'
import type React from 'react'
import CustomImageExtension from './custom-image-extension'
import FileExtension from './file-extension'

// Use internal editor state selector
export const useInternalEditor = (): Editor => {
  const { editor } = useCurrentEditor()
  if (!editor) {
    throw new Error('useInternalEditor must be used within the EditorContext')
  }
  return editor
}

// Alignment
export type Alignment = 'left' | 'center' | 'right' | 'justify'

// Min width
export const minWidth = 320

// Default extensions
export const defaultExtensions = [
  StarterKit.configure({
    heading: {
      levels: [1, 2, 3, 4]
    },
    link: {
      autolink: true,
      defaultProtocol: 'https',
      openOnClick: false,
      protocols: ['https']
    }
  }),
  Highlight.configure({ multicolor: true }),
  Color,
  TaskList,
  TaskItem.configure({
    nested: true
  }),
  TextStyle,
  // Placeholder.configure({
  //   placeholder: 'Enter content'
  // }),
  CustomImageExtension,
  FileExtension
  // FileHandler.configure({
  //   allowedMimeTypes: ['image/png', 'image/jpeg', 'image/webp'],
  //   onDrop: (currentEditor, files, pos) => {
  //     files.forEach((file) => {
  //       const fileReader = new FileReader()

  //       fileReader.readAsDataURL(file)
  //       fileReader.onload = () => {
  //         currentEditor
  //           .chain()
  //           .insertContentAt(pos, {
  //             type: 'image',
  //             attrs: {
  //               src: fileReader.result
  //             }
  //           })
  //           .focus()
  //           .run()
  //       }
  //     })
  //   },
  //   onPaste: (currentEditor, files, htmlContent) => {
  //     files.forEach((file) => {
  //       if (htmlContent) {
  //         // if there is htmlContent, stop manual insertion & let other extensions handle insertion via inputRule
  //         // you could extract the pasted file from this url string and upload it to a server for example
  //         console.log(htmlContent)
  //         return false
  //       }

  //       const fileReader = new FileReader()

  //       fileReader.readAsDataURL(file)
  //       fileReader.onload = () => {
  //         currentEditor
  //           .chain()
  //           .insertContentAt(currentEditor.state.selection.anchor, {
  //             type: 'image',
  //             attrs: {
  //               src: fileReader.result
  //             }
  //           })
  //           .focus()
  //           .run()
  //       }
  //     })
  //   }
  // })
]

// Container class name per alignment
export const containerClassNamePerAlignment: Record<Alignment, string> = {
  center: 'justify-center',
  justify: 'justify-stretch',
  left: 'justify-start',
  right: 'justify-end'
}

// Alignments
export const alignments: Array<{
  value: Alignment
  icon: React.ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>>
  label: string
  shortcut: string
}> = [
  {
    icon: AlignLeft,
    label: 'Align left',
    shortcut: 'Ctrl Shift L',
    value: 'left'
  },
  {
    icon: AlignCenter,
    label: 'Align center',
    shortcut: 'Ctrl Shift E',
    value: 'center'
  },
  {
    icon: AlignRight,
    label: 'Align right',
    shortcut: 'Ctrl Shift R',
    value: 'right'
  },
  {
    icon: AlignJustify,
    label: 'Align justify',
    shortcut: 'Ctrl Shift J',
    value: 'justify'
  }
]

// Get editor value
export const getEditorValue = (editor: Editor, format: 'html' | 'json' | 'text'): object | string => {
  switch (format) {
    case 'json':
      return editor.getJSON()
    case 'html':
      return editor.isEmpty ? '' : editor.getHTML()
    default:
      return editor.getText()
  }
}

// Is valid youtube url
export const youtubeUrlRegex =
  /^((?:https?:)?\/\/)?((?:www|m|music)\.)?((?:youtube\.com|youtu\.be|youtube-nocookie\.com))(\/(?:[\w-]+\?v=|embed\/|v\/)?)([\w-]+)(\S+)?$/

export const isValidYoutubeUrl = (url: string) => url.match(youtubeUrlRegex)
