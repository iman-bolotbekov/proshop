import React from 'react'
import styles from './PaginationItem.module.css'

interface PaginationItemProps {
  page: number | string
  currentPage: number
  onPageChange: (page: number) => void
  isDisabled?: boolean
}

const PaginationItem: React.FC<PaginationItemProps> = ({
  page,
  currentPage,
  onPageChange,
  isDisabled,
}) => {
  return (
    <li
      className={`${styles.pageItem} ${
        page === currentPage ? styles.active : ''
      } ${isDisabled ? styles.disabled : ''}`}
      onClick={() => onPageChange(Number(page))}
    >
      <span className={styles.pageLink}>{page}</span>
    </li>
  )
}

export default PaginationItem
