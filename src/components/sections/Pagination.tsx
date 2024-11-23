import React from 'react'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

type PaginationMainProps = {
  currentPage: number
  totalPages: number
  goToPage: (page: number) => void
}

function PaginationMain({
  currentPage,
  totalPages,
  goToPage,
}: PaginationMainProps) {
  // Prevent default link action and navigate programmatically
  const handlePageClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    page: number,
  ) => {
    e.preventDefault()
    goToPage(page)
  }

  return (
    <div className="pt-6">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              // aria-disabled={true}
              // className="disabled"
              href="#!"
              onClick={(e) => handlePageClick(e, currentPage - 1)}
              className={currentPage === 1 ? 'pointer-events-none' : ''}
              aria-disabled={currentPage === 1}
              tabIndex={currentPage === 1 ? -1 : undefined}
            />
          </PaginationItem>

          {[...Array(totalPages)].map((_, num) => (
            <PaginationItem key={num + 1}>
              <PaginationLink
                isActive={currentPage === num + 1}
                href="#!"
                onClick={(e) => handlePageClick(e, num + 1)}
              >
                {num + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

          {totalPages > 5 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationNext
              href="#!"
              onClick={(e) => handlePageClick(e, currentPage + 1)}
              className={
                currentPage === totalPages ? 'pointer-events-none' : ''
              }
              aria-disabled={currentPage === totalPages}
              tabIndex={currentPage === totalPages ? -1 : undefined}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}

export default PaginationMain
