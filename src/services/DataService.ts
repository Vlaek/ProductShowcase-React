import axios from 'axios'
import { IItem } from './../types/types'

export default class DataService {
	static async getAll() {
		const response = await axios.get('/products.json', {
			params: {},
		})
		const newData = response.data.map((item: IItem, index: number) => {
			return { ...item, id: index }
		})
		return newData as IItem[]
	}

	static async getById(id: string | undefined) {
		const response = await axios.get('/products.json')
		const newData = response.data.map((item: IItem, index: number) => {
			return { ...item, id: index }
		})
		if (id === undefined) return null
		const item = (newData as IItem[]).find(item => item.id === +id)
		return item === undefined ? null : item
	}
}
