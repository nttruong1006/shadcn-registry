import type { Content } from '@tiptap/react'
import React from 'react'
import { Editor } from '@/components/organisms/editor'
import { Toaster } from '@/components/ui/sonner'

// Component
export const EditorDemo = () => {
  // States
  const [value, setValue] = React.useState<Content>('')

  // Template
  return (
    <React.Fragment>
      <Toaster />
      <Editor value={value} onValueChange={setValue} />
    </React.Fragment>
  )
}
