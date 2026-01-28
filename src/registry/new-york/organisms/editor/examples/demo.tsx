import type { Content } from '@tiptap/react'
import { useState } from 'react'
import { Editor } from '@/registry/new-york/organisms/editor/components/editor'
import { Toaster } from '@/registry/new-york/ui/sonner/components/sonner'

// Component
export const EditorDemo = () => {
  // States
  const [value, setValue] = useState<Content>('')

  // Template
  return (
    <>
      <Toaster />
      <Editor onValueChange={setValue} value={value} />
    </>
  )
}
