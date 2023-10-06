import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import Backend from 'i18next-http-backend'

i18n
	.use(Backend)
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		debug: false,
		fallbackLng: 'en',
		resources: {
			ru: {
				translation: {
					main: {
						title: 'Карточки контента',
						theme: {
							light: 'Светлая тема',
							dark: 'Тёмная тема',
						},
						language: {
							ru: 'Русский',
							en: 'Английский',
							de: 'Немецкий',
						},
					},
					table: {
						photo: 'Фото',
						name: 'Название',
						views: 'Просмотры',
						start_date: 'Начало ротации',
						end_date: 'Конец ротации',
					},
					language: 'Выбрать язык',
					sort: {
						title: 'Сортировать:',
						options: {
							one: 'по названию',
							two: 'по просмотрам',
							three: 'по дате начала',
							four: 'по дате окончания',
						},
					},
					search: {
						placeholder: 'Найти...',
					},
					item: {
						back: 'Назад',
						old_price: 'старая цена',
						new_price: 'цена по акции',
					},
					pagination: {
						title: 'Число продуктов на странице от 1 до',
					},
				},
			},
			en: {
				translation: {
					main: {
						title: 'Content cards',
						theme: {
							light: 'Light theme',
							dark: 'Dark theme',
						},
						language: {
							ru: 'Russian',
							en: 'English',
							de: 'German',
						},
					},
					table: {
						photo: 'Photo',
						name: 'Name',
						views: 'Views',
						start_date: 'Start of rotation',
						end_date: 'End of rotation',
					},
					language: 'Select language',
					sort: {
						title: 'Sort:',
						options: {
							one: 'by name',
							two: 'by views',
							three: 'by start date',
							four: 'by end date',
						},
					},
					search: {
						placeholder: 'Search...',
					},
					item: {
						back: 'Back',
						old_price: 'old price',
						new_price: 'promotion price',
					},
					pagination: {
						title: 'Number of products per page from 1 to',
					},
				},
			},
			de: {
				translation: {
					main: {
						title: 'Inhaltskarten',
						theme: {
							light: 'Helles Thema',
							dark: 'Dunkles Thema',
						},
						language: {
							ru: 'Russisch',
							en: 'Englisch',
							de: 'Deutsch',
						},
					},
					table: {
						photo: 'Foto',
						name: 'Name',
						views: 'Ansichten',
						start_date: 'Startdatum',
						end_date: 'Enddatum',
					},
					language: 'Sprache auswählen',
					sort: {
						title: 'Sortieren:',
						options: {
							one: 'nach Name',
							two: 'nach Ansichten',
							three: 'nach Startdatum',
							four: 'nach Enddatum',
						},
					},
					search: {
						placeholder: 'Suchen...',
					},
					item: {
						back: 'Zurück',
						old_price: 'alter Preis',
						new_price: 'Aktionspreis',
					},
					pagination: {
						title: 'Anzahl der Produkte pro Seite von 1 bis',
					},
				},
			},
		},
	})
i18n.changeLanguage(navigator.language)

export default i18n
