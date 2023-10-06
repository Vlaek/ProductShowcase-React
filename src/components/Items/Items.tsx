import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { IItem } from '../../types/types'
import { dateConvert } from '../../utils/dateConvert'
import styles from './Items.module.scss'

interface ItemsProps {
	items: IItem[]
}

const Items: FC<ItemsProps> = ({ items }) => {
	const navigate = useNavigate()

	return (
		<>
			{items.map(item => (
				<div
					className={styles.item}
					key={item.name}
					onClick={() => navigate(`/ProductShowcase/${item.id}`)}
				>
					<div className={styles.item__img}>
						<img src={item.image_url} alt={item.name} />
					</div>
					<div className={styles.item__info}>
						<div className={styles.item__name}>{item.name}</div>
						<div className={styles.item__category}>{item.category}</div>
					</div>
					<div className={styles.item__views}>{item.views}</div>
					<div className={styles.item__date}>
						{dateConvert(item.start_date)}
					</div>
					<div className={styles.item__date}>{dateConvert(item.end_date)}</div>
				</div>
			))}
		</>
	)
}

export default Items
