import { FC, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRubleSign } from '@fortawesome/free-solid-svg-icons'
import styles from './Prices.module.scss'
import { IItem } from '../../types/types'
import { priceConvert } from '../../utils/priceConvert'
import { useTranslation } from 'react-i18next'

interface PricesProps {
	item: IItem
}

const Prices: FC<PricesProps> = ({ item }) => {
	const [newPrice, setNewPrice] = useState(['0', '0'])
	const [oldPrice, setOldPrice] = useState(['0', '0'])

	useEffect(() => {
		if (item) {
			if (item.new_price) {
				setNewPrice(priceConvert(item.new_price))
				setOldPrice(priceConvert(item.old_price))
			} else {
				setNewPrice(priceConvert(item.old_price))
			}
		}
	}, [item])

	const { t } = useTranslation()

	return (
		<div className={styles.prices}>
			<div className={styles.old_price}>
				{oldPrice[0] !== '0' && (
					<>
						<div className={styles.price}>
							<div className={styles.int}>{oldPrice[0]}</div>
							<div className={styles.float}>{oldPrice[1]}</div>
							<FontAwesomeIcon icon={faRubleSign} className={styles.value} />
							<div className={styles.line}></div>
						</div>
						<div className={styles.text}>{t('item.old_price')}</div>
					</>
				)}
			</div>
			<div className={styles.new_price}>
				<div className={styles.price}>
					<div className={styles.int}>{newPrice[0]}</div>
					<div className={styles.float}>{newPrice[1]}</div>
					<FontAwesomeIcon icon={faRubleSign} className={styles.value} />
				</div>
				<div className={styles.text}>{t('item.new_price')}</div>
			</div>
		</div>
	)
}

export default Prices
