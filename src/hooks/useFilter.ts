import { useCallback, useEffect, useState } from 'react'
import { IFilter, IItem } from '../types/types'
import { dateConvert } from '../utils/dateConvert'
import useDebounce from './useDebounce'

export const useFilter = (data: IItem[], filter: IFilter) => {
	const [items, setItems] = useState<IItem[]>(data)

	const debouncedQuery = useDebounce(filter.query, 500)

	const applyfilter = useCallback(() => {
		let filteredTracks = [...data]

		if (debouncedQuery) {
			filteredTracks = filteredTracks.filter(
				item =>
					item.name.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
					item.category.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
					String(item.views).includes(debouncedQuery) ||
					dateConvert(item.start_date)
						.toLowerCase()
						.includes(debouncedQuery.toLowerCase()) ||
					dateConvert(item.end_date)
						.toLowerCase()
						.includes(debouncedQuery.toLowerCase()),
			)
		}

		return filteredTracks
	}, [data, debouncedQuery])

	useEffect(() => {
		const filteredTracks = applyfilter()
		setItems(filteredTracks)
	}, [applyfilter])

	return items.sort(filter.sort?.callback)
}
