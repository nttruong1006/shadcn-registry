import React from 'react'
import {
  FileUpload,
  FileUploadContent,
  FileUploadInput,
  FileUploadItem,
  type FileUploadValue
} from '@/components/molecules/file-upload/file-upload'

export function FileUploadDemo() {
  const [value, setValue] = React.useState<FileUploadValue>([])

  return (
    <FileUpload maxFiles={5} onValueChange={setValue} value={value}>
      <FileUploadInput />
      <FileUploadContent>
        {value.map((item, index) => (
          <FileUploadItem index={index} key={`${item instanceof File ? item.name : item.id}`} value={item} />
        ))}
      </FileUploadContent>
    </FileUpload>
  )
}
