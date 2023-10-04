import axios from 'axios'
import { IItem } from './../types/types'

export default class DataService {
	static async getDataLength() {
		try {
			const response = await axios.get(
				'https://651d237544e393af2d5938ea.mockapi.io/products',
			)
			return response.data.length as number
		} catch (error) {
			console.error(error)
			return 0
		}
	}

	static async getAll(limit: string | number = '', page: string | number = '') {
		try {
			const response = await axios.get(
				`https://651d237544e393af2d5938ea.mockapi.io/products`,
				{
					params: {
						completed: false,
						page: page,
						limit: limit,
					},
				},
			)
			const newData = response.data.map((item: IItem, index: number) => {
				return { ...item, id: index }
			})
			return newData as IItem[]
		} catch (error) {
			console.error(error)
			return []
		}
	}

	static async getById(id: string | undefined) {
		try {
			const response = await axios.get('/products.json')
			const newData = response.data.map((item: IItem, index: number) => {
				return { ...item, id: index }
			})
			if (id === undefined) return null
			const item = (newData as IItem[]).find(item => item.id === +id)
			return item === undefined ? null : item
		} catch (error) {
			console.error(error)
			return null
		}
	}
}
