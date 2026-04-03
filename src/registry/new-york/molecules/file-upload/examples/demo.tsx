import React from 'react'
import {
  FileUpload,
  FileUploadContent,
  FileUploadInput,
  FileUploadItem,
  type FileUploadProps
} from '@/registry/new-york/molecules/file-upload/components/file-upload'

// Component
export const FileUploadDemo = () => {
  // States
  const [value, setValue] = React.useState<FileUploadProps['value']>([])

  // Template
  return (
    <FileUpload
      dropzoneOptions={{
        maxFiles: 5
      }}
      onValueChange={setValue}
      value={value}
    >
      <FileUploadInput />
      <FileUploadContent>
        {value.map((item, index) => (
          <FileUploadItem index={index} key={`${item instanceof File ? item.name : item.id}`} value={item} />
        ))}
      </FileUploadContent>
    </FileUpload>
  )
}
