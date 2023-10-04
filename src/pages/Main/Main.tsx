import { FC, useState, useEffect } from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Sort from '../../components/Sort/Sort'
import Pagination from '../../components/Pagination/Pagination'
import Items from '../../components/Items/Items'
import Search from '../../components/Search/Search'
import DataService from '../../services/DataService'
import { IFilter, IItem } from '../../types/types'
import { useFilter } from '../../hooks/useFilter'
import styles from './Main.module.scss'

const Main: FC = () => {
	const [data, setData] = useState<IItem[]>([])
	const [totalItems, setTotalItems] = useState(0)
	const [page, setPage] = useState(0)
	const [limit, setLimit] = useState(3)
	const [isLoading, setIsLoading] = useState(true)

	const [filter, setFilter] = useState<IFilter>({
		sort: {
			name: 'по названию',
			callback: (a, b) => a.name.localeCompare(b.name),
		},
		query: '',
	})

	useEffect(() => {
		const handleFetchData = async () => {
			try {
				const response = await DataService.getAll()
				setData([...response])
				setIsLoading(true)
			} finally {
				setIsLoading(false)
			}

			const length = await DataService.getDataLength()
			setTotalItems(length)
		}
		handleFetchData()
	}, [])

	const handleSortByField = (
		sort: (a: IItem, b: IItem) => number,
		name: string,
	) => {
		if (filter.sort === undefined) {
			return
		} else if (String(filter.sort.callback) === String(sort)) {
			setFilter({
				...filter,
				sort: { name, callback: (a, b) => sort(b, a) },
			})
		} else {
			setFilter({ ...filter, sort: { name, callback: sort } })
		}
	}

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFilter({ ...filter, query: e.target.value })
	}

	const sortedAndFilteredItems = useFilter(data, filter)

	const totalPages = Math.ceil(sortedAndFilteredItems.length / limit)

	const pages = Array.from({ length: totalPages }, (_, i) =>
		sortedAndFilteredItems.slice(i * limit, i * limit + limit),
	)

	return (
		<div className={styles.wrapper}>
			<div className={styles.content}>
				<div className={styles.title}>Карточки контента</div>
				<div className={styles.filter}>
					<Sort filter={filter} onSort={handleSortByField} />
					<Search filter={filter} onSearch={handleSearch} />
				</div>
				<Pagination
					setPage={setPage}
					totalItems={totalItems}
					limit={limit}
					setLimit={setLimit}
					currentPage={page}
					isLoading={isLoading}
				/>
				<div className={styles.table}>
					<div className={styles.table__header}>
						<div>Фото</div>
						<div>Название</div>
						<div>Просмотры</div>
						<div>Начало ротации</div>
						<div>Конец ротации</div>
					</div>
					{isLoading ? (
						<SkeletonTheme
							baseColor='#b5b5b5'
							highlightColor='#cccccc'
							height={75}
							width={'100%'}
							enableAnimation={true}
						>
							<Skeleton count={3} className={styles.skelet} />
						</SkeletonTheme>
					) : (
						pages.length > 0 && <Items items={pages[page]} />
					)}
				</div>
			</div>
		</div>
	)
}

export default Main
