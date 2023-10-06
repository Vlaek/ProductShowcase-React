import { FC, useEffect } from 'react'
import { GrFormNext, GrFormPrevious } from 'react-icons/gr'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import cn from 'classnames'
import styles from './Pagination.module.scss'
import { useTranslation } from 'react-i18next'

interface PaginationProps {
	setPage: React.Dispatch<React.SetStateAction<number>>
	totalItems: number
	limit: number
	setLimit: React.Dispatch<React.SetStateAction<number>>
	currentPage: number
	isLoading: boolean
}

const Pagination: FC<PaginationProps> = ({
	setPage,
	totalItems,
	limit,
	setLimit,
	currentPage,
	isLoading,
}) => {
	const totalPages = Math.ceil(totalItems / limit)
	const pages = Array.from({ length: totalPages }, (_, index) => index + 1)

	useEffect(() => {
		if (currentPage >= totalPages) {
			setPage(0)
		}
	}, [currentPage, setPage, totalPages])

	let startPage = Math.max(1, currentPage)
	let endPage = Math.min(totalPages, currentPage + 2)

	if (endPage - startPage < 2) {
		if (startPage === 1) {
			endPage = Math.min(totalPages, startPage + 2)
		} else {
			startPage = Math.max(1, endPage - 2)
		}
	}

	const handlePrevPage = () => {
		if (currentPage > 0) {
			setPage(prev => prev - 1)
		}
	}

	const handleNextPage = () => {
		if (currentPage < totalPages - 1) {
			setPage(prev => prev + 1)
		}
	}

	const handleClickPage = (page: number) => {
		if (currentPage !== page - 1) {
			setPage(page - 1)
		}
	}

	const handleChangeLimit = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (+e.target.value > 0)
			if (+e.target.value > totalItems) setLimit(totalItems)
			else setLimit(+e.target.value)
	}

	const { t } = useTranslation()

	return (
		<div className={styles.wrapper}>
			<div className={styles.pagination}>
				<div className={styles.pagination__page} onClick={handlePrevPage}>
					<GrFormPrevious />
				</div>
				{isLoading ? (
					<SkeletonTheme
						baseColor='#b5b5b5'
						highlightColor='#cccccc'
						height={32}
						width={36}
						enableAnimation={true}
						inline
					>
						<Skeleton count={3} className={styles.pagination__skelet} />
					</SkeletonTheme>
				) : (
					pages.map(page => {
						if (page < startPage || page > endPage) return null
						return (
							<div
								key={page}
								className={cn(styles.pagination__page, {
									[styles.active]: page - 1 === currentPage,
								})}
								onClick={() => handleClickPage(page)}
							>
								{page}
							</div>
						)
					})
				)}
				<div className={styles.pagination__page} onClick={handleNextPage}>
					<GrFormNext />
				</div>
			</div>
			<input
				className={styles.pagination__input}
				type='number'
				value={limit}
				onChange={handleChangeLimit}
				title={`${t('pagination.title')} ${totalItems}`}
			/>
		</div>
	)
}

export default Pagination
