import { FC } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
// import Main from './components/Main/Main'
import AppRouter from './components/AppRouter'

const App: FC = () => {
	return (
		<Router>
			<AppRouter />
		</Router>
	)
}

export default App
