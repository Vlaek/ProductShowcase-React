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
import { useTranslation } from 'react-i18next'
import LanguageSelect from '../../components/LanguageSelect/LanguageSelect'
import { useTheme } from './../../hooks/useTheme'
import cn from 'classnames'

const Main: FC = () => {
	const [data, setData] = useState<IItem[]>([])
	const [page, setPage] = useState(0)
	const [limit, setLimit] = useState(3)
	const [isLoading, setIsLoading] = useState(true)

	const [filter, setFilter] = useState<IFilter>({
		sort: {
			id: 0,
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
		}
		handleFetchData()
	}, [])

	const handleSortByField = (
		sort: (a: IItem, b: IItem) => number,
		id: number,
	) => {
		if (filter.sort === undefined) {
			return
		} else if (String(filter.sort.callback) === String(sort)) {
			setFilter({
				...filter,
				sort: { id, callback: (a, b) => sort(b, a) },
			})
		} else {
			setFilter({ ...filter, sort: { id, callback: sort } })
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

	const { t } = useTranslation()

	const { theme, setTheme } = useTheme()

	return (
		<div className={styles.wrapper}>
			<div className={styles.content}>
				<div className={styles.title}>{t('main.title')}</div>
				<div className={styles.filter}>
					<Sort filter={filter} onSort={handleSortByField} />
					<Search filter={filter} onSearch={handleSearch} />
				</div>
				<div className={styles.pagination}>
					<div className={styles.pag}>
						<Pagination
							setPage={setPage}
							totalItems={sortedAndFilteredItems.length}
							limit={limit}
							setLimit={setLimit}
							currentPage={page}
							isLoading={isLoading}
						/>
						<LanguageSelect />
					</div>
					<div className={styles.theme}>
						<div
							className={cn(styles.theme__item, {
								[styles.active]: theme === 'Light',
							})}
							onClick={() => setTheme('Light')}
						>
							{t('main.theme.light')}
						</div>
						<div
							className={cn(styles.theme__item, {
								[styles.active]: theme === 'Dark',
							})}
							onClick={() => setTheme('Dark')}
						>
							{t('main.theme.dark')}
						</div>
					</div>
				</div>
				<div className={styles.table}>
					<div className={styles.table__header}>
						<div>{t('table.photo')}</div>
						<div>{t('table.name')}</div>
						<div>{t('table.views')}</div>
						<div>{t('table.start_date')}</div>
						<div>{t('table.end_date')}</div>
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
