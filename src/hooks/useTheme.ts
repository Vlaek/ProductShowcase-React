import { useLayoutEffect, useState } from 'react'

const isDarkThema = window?.matchMedia('(prefers-color-scheme: dark)').matches
const defaultTheme = isDarkThema ? 'Dark' : 'Light'

export const useTheme = () => {
	const [theme, setTheme] = useState<string>(
		localStorage.getItem('theme') || defaultTheme,
	)

	localStorage.setItem('theme', theme)

	useLayoutEffect(() => {
		document.documentElement.setAttribute('data-theme', theme)
	}, [theme])

	return { theme, setTheme }
}
