import { useCallback } from 'react'
import { toast } from 'sonner'

// Uploaded file
export interface UploadedFile {
  compress_info: Record<
    string,
    {
      ext: string
      size: number
    }
  >
  id: string
  mime: string
  original: string
  path: string
}

// Get file url
export const getFileUrl = (path: string) => {
  if (path.startsWith('https')) {
    return path
  }
  return `https://${path}`
}

// Get size text
export const getSizeText = (size: number) =>
  size < 1024 * 1024 ? `${(size / 1024).toFixed(2)}Kb` : `${(size / 1024 / 1024).toFixed(2)}MB`

// Use file upload
export const useFileUpload = (args?: { throwError?: boolean }) => {
  // Args
  const { throwError = false } = args ?? {}

  // Methods
  const uploadFile = useCallback(
    (file: File): Promise<UploadedFile | null> => {
      try {
        console.log(file)
        // Mutate

        // Extract response and return value
        return Promise.resolve(null)
      } catch (error) {
        if (throwError) {
          throw new Error('An error occurred when upload the file', {
            cause: error
          })
        }
        toast.error('Failure', {
          description: 'An error occurred when upload the file'
        })
        return Promise.resolve(null)
      }
    },
    [throwError]
  )

  return {
    fileUploadPending: false,
    uploadFile
  }
}
