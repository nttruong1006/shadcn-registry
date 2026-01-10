import type { Dispatch, SetStateAction } from 'react'

declare module '@tanstack/react-table' {
  // @ts-expect-error
  interface TableMeta {
    isSelectAllRows?: boolean
    setIsSelectAllRows?: Dispatch<SetStateAction<boolean>>
  }

  // @ts-expect-error
  interface ColumnMeta {
    className?: string
  }
}
