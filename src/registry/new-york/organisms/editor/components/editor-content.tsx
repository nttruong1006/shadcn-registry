import type { Content } from '@tiptap/react'
import parse from 'html-react-parser'

export function EditorContent({ content }: { content: Content }) {
  if (typeof content === 'string') {
    return <div className='tiptap'>{parse(content)}</div>
  }
  return null
}
