import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import cn from 'classnames'
import styles from './LanguageSelect.module.scss'

type Locale = {
	[key: string]: { title: string }
}

const locales: Locale = {
	ru: { title: 'Russian' },
	en: { title: 'English' },
	de: { title: 'German' },
}

const LanguageSelect: FC = () => {
	const { t, i18n } = useTranslation()
	return (
		<div className={styles.wrapper}>
			<ul className={styles.list}>
				{Object.keys(locales).map(locale => (
					<li className={styles.item} key={locale}>
						<button
							className={cn(styles.button, {
								[styles.active]: i18n.resolvedLanguage === locale,
							})}
							type='submit'
							onClick={() => i18n.changeLanguage(locale)}
							title={t('language')}
						>
							{locales[locale].title}
						</button>
					</li>
				))}
			</ul>
		</div>
	)
}

export default LanguageSelect
