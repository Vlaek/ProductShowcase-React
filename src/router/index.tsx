import Main from '../pages/Main/Main'
import Item from '../pages/Item/Item'

export const routes = [
	{ path: '/', element: <Main />, exact: true },
	{ path: '/:id', element: <Item />, exact: true },
]
