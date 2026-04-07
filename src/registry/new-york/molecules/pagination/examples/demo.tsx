import { useState } from 'react'
import { Pagination } from '@/components/molecules/pagination'

export function PaginationDemo() {
  const [page, setPage] = useState(1)

  return <Pagination onChangePage={setPage} page={page} pageCount={10} />
}
