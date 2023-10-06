import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import './styles/index.scss'
import App from './App'
import store from './store/store'
import './i18n'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<Suspense fallback={<div>Loading...</div>}>
				<App />
			</Suspense>
		</Provider>
	</React.StrictMode>,
)
