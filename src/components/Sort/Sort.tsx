import { FC } from 'react'
import { BsSortDownAlt, BsSortUp } from 'react-icons/bs'
import { IFilter, IItem, SortItem } from '../../types/types'
import cn from 'classnames'
import styles from './Sort.module.scss'

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

interface SortProps {
	filter: IFilter
	onSort: (sort: (a: IItem, b: IItem) => number, name: string) => void
}

const Sort: FC<SortProps> = ({ filter, onSort }) => {
	return (
		<div className={styles.sort}>
			<p className={styles.sort__text}>Сортировать:</p>
			{sortList.map((item, index) => (
				<div className={styles.sort__button} key={index}>
					<div
						className={cn(styles.sort__text, {
							[styles.active]: filter.sort.name === item.name,
						})}
						onClick={() => onSort(item.callback, item.name)}
					>
						{item.name}
					</div>
					{filter.sort.name === item.name ? (
						String(filter.sort.callback) === String(item.callback) ? (
							<BsSortDownAlt className={styles.sort__type} />
						) : (
							<BsSortUp className={styles.sort__type} />
						)
					) : (
						<div className={styles.sort__type}></div>
					)}
				</div>
			))}
		</div>
	)
}

export default Sort
