import { IItem } from './../../types/types'

const initialState: IItem[] = []

export type ItemsState = {
	type: 'SET_ITEMS'
	payload: IItem[]
}

export const itemsReducer = (
	state = initialState,
	action: ItemsState,
): IItem[] => {
	switch (action.type) {
		case 'SET_ITEMS': {
			return action.payload
		}
		default:
			return state
	}
}
