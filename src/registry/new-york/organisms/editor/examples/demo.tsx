import type { Content } from '@tiptap/react'
import { useState } from 'react'
import { Editor } from '@/components/organisms/editor/editor'

export function EditorDemo() {
  const [value, setValue] = useState<Content>('')

  return <Editor id='editor-demo' onValueChange={setValue} value={value} />
}
