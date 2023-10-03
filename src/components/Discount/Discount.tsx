import { FC } from 'react'
import { IItem } from '../../types/types'
import styles from './Discount.module.scss'

interface DiscountProps {
	item: IItem
}

const Discount: FC<DiscountProps> = ({ item }) => {
	return (
		<div
			className={styles.discount}
			style={{
				visibility: item.discount === 0 ? 'hidden' : 'visible',
			}}
		>
			-{item.discount}%<span className={styles.triangle}></span>
		</div>
	)
}

export default Discount
