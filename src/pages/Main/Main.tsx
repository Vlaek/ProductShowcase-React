import { FC, useState, useEffect } from 'react'
import { BsSortDownAlt, BsSortUp } from 'react-icons/bs'
import { ImSearch } from 'react-icons/im'
import { GrFormNext, GrFormPrevious } from 'react-icons/gr'
import styles from './Main.module.scss'
import { dateConvert } from './../../utils/dateConvert'
import { useNavigate } from 'react-router-dom'
import { IItem, SortItem } from '../../types/types'
import DataService from '../../services/DataService'
import cn from 'classnames'

const sortList: SortItem[] = [
	{
		name: 'по названию',
		callback: (a, b) => a.name.localeCompare(b.name),
	},
	{
		name: 'по просмотрам',
		callback: (a, b) => a.views - b.views,
	},
	{
		name: 'по дате начала',
		callback: (a, b) => a.start_date.localeCompare(b.start_date),
	},
	{
		name: 'по дате окончания',
		callback: (a, b) => a.end_date.localeCompare(b.end_date),
	},
]

const Main: FC = () => {
	const [data, setData] = useState<IItem[]>([])

	const [filter, setFilter] = useState<{
		sort: SortItem
		query: string
	}>({
		sort: {
			name: 'по названию',
			callback: (a, b) => a.name.localeCompare(b.name),
		},
		query: '',
	})

	const navigate = useNavigate()

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

	const filteredData = [...data].filter(
		item =>
			item.name.toLowerCase().includes(filter.query.toLowerCase()) ||
			item.category.toLowerCase().includes(filter.query.toLowerCase()) ||
			String(item.views).includes(filter.query) ||
			dateConvert(item.start_date)
				.toLowerCase()
				.includes(filter.query.toLowerCase()) ||
			dateConvert(item.end_date)
				.toLowerCase()
				.includes(filter.query.toLowerCase()),
	)

	const sortedData = filteredData.sort(filter.sort?.callback)

	return (
		<div className={styles.wrapper}>
			<div className={styles.content}>
				<div className={styles.title}>Карточки контента</div>
				<div className={styles.filter}>
					<div className={styles.sort}>
						<p className={styles.sort__text}>Сортировать:</p>
						{sortList.map((item, index) => (
							<div className={styles.sort__button}>
								<div
									className={cn(styles.text, {
										[styles.active]: filter.sort.name === item.name,
									})}
									onClick={() => handleSortByField(item.callback, item.name)}
									key={index}
								>
									{item.name}
								</div>
								{filter.sort.name === item.name ? (
									String(filter.sort.callback) === String(item.callback) ? (
										<BsSortDownAlt className={styles.type} />
									) : (
										<BsSortUp className={styles.type} />
									)
								) : (
									<div className={styles.type}></div>
								)}
							</div>
						))}
					</div>
					<div className={styles.search}>
						<input
							type='text'
							placeholder='Поиск...'
							value={filter.query}
							onChange={handleSearch}
						/>
						<ImSearch className={styles.search__icon} />
					</div>
				</div>
				<div className={styles.pagination}>
					<div className={styles.pagination__page}>
						<GrFormPrevious />
					</div>
					<div className={styles.pagination__page}>1</div>
					<div className={styles.pagination__page}>2</div>
					<div className={styles.pagination__page}>3</div>
					<div className={styles.pagination__page}>
						<GrFormNext />
					</div>
				</div>
				<div className={styles.table}>
					<div className={styles.table__header}>
						<div>Фото</div>
						<div>Название</div>
						<div>Просмотры</div>
						<div>Начало ротации</div>
						<div>Конец ротации</div>
					</div>
					{sortedData.map(item => (
						<div
							className={styles.table__item}
							key={item.name}
							onClick={() => navigate(`/${item.id}`)}
						>
							<div className={styles.item__img}>
								<img src={item.image_url} alt={item.name} />
							</div>
							<div className={styles.item__info}>
								<div className={styles.item__name}>{item.name}</div>
								<div className={styles.item__category}>{item.category}</div>
							</div>
							<div className={styles.item__views}>{item.views}</div>
							<div className={styles.item__date}>
								{dateConvert(item.start_date)}
							</div>
							<div className={styles.item__date}>
								{dateConvert(item.end_date)}
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default Main
