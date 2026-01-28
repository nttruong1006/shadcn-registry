import React from 'react'
import { Pagination } from '@/registry/new-york/molecules/pagination/components/pagination'

// Component
export const PaginationDemo = () => {
  // States
  const [page, setPage] = React.useState(1)

  // Template
  return <Pagination onChangePage={setPage} page={page} pageCount={10} />
}
