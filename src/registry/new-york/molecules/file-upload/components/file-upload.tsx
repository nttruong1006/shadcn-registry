import { CloudUploadIcon, FileIcon, XIcon } from 'lucide-react'
import { createContext, type HTMLAttributes, type PropsWithChildren, useCallback, useContext, useMemo } from 'react'
import { type DropzoneOptions, type DropzoneState, type FileRejection, useDropzone } from 'react-dropzone'
import { toast } from 'sonner'
import { Button } from '@/components/atoms/button'
import { Input } from '@/components/atoms/input'
import { cn } from '@/utils/ui'
import { getSizeText, type UploadedFile } from './lib'

export type FileUploadValue = Array<File | UploadedFile>

export type FileUploadProps = DropzoneOptions &
  PropsWithChildren & {
    value: FileUploadValue
    replaceOnSelect?: boolean
    disabled?: boolean
    className?: string
    onValueChange: (value: FileUploadProps['value']) => void
  }

export type FileUploadContextValue = Pick<FileUploadProps, 'value' | 'onValueChange'> & {
  dropzoneState: DropzoneState
  disabled: boolean
}

const FileUploadContext = createContext<FileUploadContextValue | null>(null)

export function useFileUploadContext() {
  const context = useContext(FileUploadContext)
  if (!context) {
    throw new Error('useFileUploadContext must be used within the FileUpload')
  }
  return context
}

export function FileUpload({
  value,
  replaceOnSelect: replaceOnSelectProp,
  disabled: disabledProp,
  className,
  children,
  onValueChange,
  ...dropzoneOptions
}: FileUploadProps) {
  const { maxFiles = 1, maxSize = 20 * 1024 * 1024, ...restDropzoneOptions } = dropzoneOptions ?? {}
  const replaceOnSelect = maxFiles === 1 ? true : replaceOnSelectProp
  const multiple = maxFiles > 1
  const disabled = Boolean(disabledProp === undefined ? value.length === maxFiles && !replaceOnSelect : disabledProp)

  // Dropzone
  const dropzoneState = useDropzone({
    maxFiles,
    maxSize,
    multiple,
    disabled,
    ...restDropzoneOptions,
    onDrop: useCallback(
      (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
        const newValues = [...value]

        if (replaceOnSelect) {
          newValues.splice(0, newValues.length)
        }

        for (const acceptedFile of acceptedFiles) {
          if (newValues.length < maxFiles) {
            newValues.push(acceptedFile)
          }
        }

        onValueChange(newValues)

        if (rejectedFiles.length > 0) {
          if (
            rejectedFiles.some((rejectedFile) => rejectedFile.errors.some((error) => error.code === 'too-many-files'))
          ) {
            toast.warning('The number of files exceeds the allowed number', {
              description: `Only ${maxFiles} files are allowed to be uploaded`
            })
            return
          }

          for (const rejectedFile of rejectedFiles) {
            if (rejectedFile.errors[0]?.code === 'file-too-large') {
              toast.warning('File size exceeds the allowed limit', {
                description: `File ${rejectedFile.file.name} (Maximum size is ${Math.round(maxSize / 1024 / 1024).toString()}MB)`
              })
              return
            }

            if (rejectedFile.errors[0]?.code === 'file-invalid-type') {
              const acceptedExtensions = Object.values(dropzoneOptions?.accept ?? {}).reduce<string[]>((acc, cur) => {
                acc.push(...cur.map((extension) => extension))
                return acc
              }, [])

              toast.warning('Unsupported file format', {
                description: `File ${rejectedFile.file.name} (Allowed formats are ${acceptedExtensions.join(', ')})`
              })
              return
            }

            toast.warning('Error', {
              description: 'An error occurred while uploading the file'
            })
          }
        }
      },
      [value, replaceOnSelect, maxFiles, maxSize, dropzoneOptions?.accept, onValueChange]
    )
  })

  return (
    <FileUploadContext.Provider
      value={{
        value,
        dropzoneState,
        disabled,
        onValueChange
      }}
    >
      <div className={cn('flex w-full flex-col gap-2', className)} data-slot='file-upload'>
        {children}
      </div>
    </FileUploadContext.Provider>
  )
}

export type FileUploadInputProps = HTMLAttributes<HTMLDivElement>

export function FileUploadInput({ id, className, children, ...restProps }: FileUploadInputProps) {
  const { dropzoneState, disabled } = useFileUploadContext()
  const dropzoneRootProps = disabled ? {} : dropzoneState.getRootProps()

  return (
    <div
      className={cn(
        'relative w-full rounded-md border bg-transparent text-sm hover:bg-accent/40 aria-invalid:border-destructive dark:bg-input/30',
        disabled ? 'cursor-not-allowed opacity-50' : 'cursor-default',
        className
      )}
      data-slot='file-upload-input'
      {...dropzoneRootProps}
      {...restProps}
    >
      {children ?? (
        <div className='flex w-full flex-col items-center justify-center gap-4 p-4 text-muted-foreground'>
          <CloudUploadIcon className='size-10' />
          <span className='text-center'>Drag and drop a file here or select a file</span>
        </div>
      )}
      <Input disabled={disabled} id={id} ref={dropzoneState.inputRef} {...dropzoneState.getInputProps()} />
    </div>
  )
}

export type FileUploadContentProps = PropsWithChildren & { className?: string }

export function FileUploadContent({ className, children }: FileUploadContentProps) {
  return (
    <div className={cn('max-h-80 overflow-auto', className)} data-slot='file-upload-content'>
      <div className='space-y-2'>{children}</div>
    </div>
  )
}

export type FileUploaderItemProps = HTMLAttributes<HTMLDivElement> & {
  value: FileUploadValue[number]
  index: number
}

export function FileUploadItem({ value, index, className, children }: FileUploaderItemProps) {
  const { value: fileUploadValue, onValueChange } = useFileUploadContext()

  const { name, size } = useMemo<{ name: string; size: string }>(() => {
    const size = value instanceof File ? value.size : (value.compress_info?.['']?.size ?? 0)
    const name = value instanceof File ? value.name : value.original
    return {
      name,
      size: getSizeText(size)
    }
  }, [value])

  return (
    <div
      className={cn(
        'flex cursor-default items-center justify-between gap-2 overflow-hidden rounded-md border bg-transparent p-2 transition-colors hover:bg-accent/40',
        className
      )}
      data-slot='file-upload-item'
    >
      {children ?? (
        <div className='flex items-center gap-2 overflow-hidden'>
          <div className='flex size-10 shrink-0 items-center justify-center rounded-full border'>
            <FileIcon className='size-4' />
          </div>

          <div className='space-y-2'>
            <div>{name}</div>
            <div>{size}</div>
          </div>
        </div>
      )}

      <Button
        onClick={() => {
          const newFileUploadValue = [...fileUploadValue]
          newFileUploadValue.splice(index, 1)
          onValueChange(newFileUploadValue)
        }}
        size='icon-sm'
        variant='ghost'
      >
        <XIcon />
      </Button>
    </div>
  )
}
