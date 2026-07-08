export interface FileAttributes {
  mime: string
  name: string
  size: number
  url: string
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    file: {
      insertFile: (options: FileAttributes) => ReturnType
    }
  }
}
