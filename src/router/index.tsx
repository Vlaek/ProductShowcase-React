import Main from '../pages/Main/Main'
import Item from '../pages/Item/Item'

export const routes = [
	{ path: '/ProductShowcase/', element: <Main />, exact: true },
	{ path: '/ProductShowcase/:id', element: <Item />, exact: true },
]
