import { FC } from 'react'
import { ImSearch } from 'react-icons/im'
import styles from './Search.module.scss'
import { IFilter } from './../../types/types'

interface SearchProps {
	filter: IFilter
	onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Search: FC<SearchProps> = ({ filter, onSearch }) => {
	return (
		<div className={styles.search}>
			<input
				type='text'
				placeholder='Поиск...'
				value={filter.query}
				onChange={onSearch}
			/>
			<ImSearch className={styles.search__icon} />
		</div>
	)
}

export default Search
