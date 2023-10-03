import { FC, useState, useEffect } from 'react'
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

	const [filter, setFilter] = useState<IFilter>({
		sort: {
			name: 'по названию',
			callback: (a, b) => a.name.localeCompare(b.name),
		},
		query: '',
	})

	useEffect(() => {
		const handleFetchData = async () => {
			const response = await DataService.getAll()
			setData([...response])
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

	return (
		<div className={styles.wrapper}>
			<div className={styles.content}>
				<div className={styles.title}>Карточки контента</div>
				<div className={styles.filter}>
					<Sort filter={filter} onSort={handleSortByField} />
					<Search filter={filter} onSearch={handleSearch} />
				</div>
				<Pagination />
				<div className={styles.table}>
					<div className={styles.table__header}>
						<div>Фото</div>
						<div>Название</div>
						<div>Просмотры</div>
						<div>Начало ротации</div>
						<div>Конец ротации</div>
					</div>
					<Items items={sortedAndFilteredItems} />
				</div>
			</div>
		</div>
	)
}

export default Main
