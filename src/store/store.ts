import { createStore, combineReducers } from 'redux'
import { itemsReducer } from './reducers/reducer'
import { IItem } from './../types/types'

const rootReducer = combineReducers({
	items: itemsReducer,
})

export type RootState = {
	items: IItem[]
}

export default createStore(rootReducer)
