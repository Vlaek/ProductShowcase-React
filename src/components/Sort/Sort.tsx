import { FC } from 'react'
import { BsSortDownAlt, BsSortUp } from 'react-icons/bs'
import { IFilter, IItem, SortItem } from '../../types/types'
import cn from 'classnames'
import styles from './Sort.module.scss'
import { useTranslation } from 'react-i18next'

interface SortProps {
	filter: IFilter
	onSort: (sort: (a: IItem, b: IItem) => number, id: number) => void
}

interface ExtendedSortItem extends SortItem {
	name: string
}

const Sort: FC<SortProps> = ({ filter, onSort }) => {
	const { t } = useTranslation()

	const sortList: ExtendedSortItem[] = [
		{
			id: 0,
			name: t('sort.options.one'),
			callback: (a, b) => a.name.localeCompare(b.name),
		},
		{
			id: 1,
			name: t('sort.options.two'),
			callback: (a, b) => a.views - b.views,
		},
		{
			id: 2,
			name: t('sort.options.three'),
			callback: (a, b) => a.start_date.localeCompare(b.start_date),
		},
		{
			id: 3,
			name: t('sort.options.four'),
			callback: (a, b) => a.end_date.localeCompare(b.end_date),
		},
	]

	return (
		<div className={styles.sort}>
			<p className={styles.sort__text}>{t('sort.title')}</p>
			{sortList.map((item, index) => (
				<div className={styles.sort__button} key={index}>
					<div
						className={cn(styles.sort__button__text, {
							[styles.active]: filter.sort.id === item.id,
						})}
						onClick={() => onSort(item.callback, item.id)}
					>
						{item.name}
					</div>
					{filter.sort.id === item.id ? (
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
