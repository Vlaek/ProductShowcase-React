export interface IItem {
	id: number
	name: string
	image_url: string
	logo_url: string
	category: string
	views: number
	start_date: string
	end_date: string
	discount: number
	stars: number
	old_price: string | number
	new_price?: string | number
	disclaimer: string
}

type SortCallback = (a: IItem, b: IItem) => number

export interface SortItem {
	name: string
	callback: SortCallback
}
