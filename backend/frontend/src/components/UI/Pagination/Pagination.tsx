import React from 'react'
import { getPagesCut, pageRange } from '../../../utils/pagination'
import PaginationItem from './PaginationItem'

interface PaginationProps {
  currentPage: number
  total: number
  limit: number
  onPageChange: (page: number) => void
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  total,
  limit,
  onPageChange,
}) => {
  const pagesCount = Math.ceil(total / limit)
  const pagesCut = getPagesCut(pagesCount, 5, currentPage)
  const pages = pageRange(pagesCut.start, pagesCut.end)
  const isFirstPage = currentPage === 1
  const isLastPage = currentPage === pagesCount
  return (
    <ul className="inline-block pl-0 mt-4 mb-4 rounded-md">
      <PaginationItem
        page="First"
        currentPage={currentPage}
        onPageChange={() => onPageChange(1)}
        isDisabled={isFirstPage}
      />
      <PaginationItem
        page="Prev"
        currentPage={currentPage}
        onPageChange={() => onPageChange(currentPage - 1)}
        isDisabled={isFirstPage}
      />
      {pages.map((page) => (
        <PaginationItem
          page={page}
          key={page}
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
      ))}
      <PaginationItem
        page="Next"
        currentPage={currentPage}
        onPageChange={() => onPageChange(currentPage + 1)}
        isDisabled={isLastPage}
      />
      <PaginationItem
        page="Last"
        currentPage={currentPage}
        onPageChange={() => onPageChange(pagesCount)}
        isDisabled={isLastPage}
      />
    </ul>
  )
}

export default Pagination
