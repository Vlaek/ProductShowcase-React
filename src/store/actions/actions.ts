import { IItem } from './../../types/types'

export const setItems = (items: IItem[]) => ({
	type: 'SET_ITEMS',
	payload: items,
})
