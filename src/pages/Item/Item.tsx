import { FC, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { GrFormPrevious } from 'react-icons/gr'
import Stars from '../../components/Stars/Stars'
import Discount from '../../components/Discount/Discount'
import DataService from '../../services/DataService'
import { IItem } from '../../types/types'
import styles from './Item.module.scss'
import Prices from '../../components/Prices/Prices'
import { useTheme } from '../../hooks/useTheme'

const Item: FC = () => {
	const [item, setItem] = useState<IItem | null>(null)

	const navigate = useNavigate()

	const { id } = useParams()

	useEffect(() => {
		const handleFetchData = async () => {
			const response = await DataService.getById(id)
			setItem(response)
		}
		handleFetchData()
	}, [id])

	useTheme()

	return (
		<div className={styles.wrapper}>
			<div className={styles.content}>
				<div className={styles.button_back} onClick={() => navigate('/')}>
					<GrFormPrevious />
					<span>Назад</span>
				</div>
				{item !== null && (
					<div className={styles.item}>
						<div className={styles.header}>
							<Discount item={item} />
							<div className={styles.logo}>
								<img src={item.logo_url} alt='logo' draggable={false} />
							</div>
						</div>
						<div className={styles.body}>
							<div className={styles.img}>
								<img src={item.image_url} alt='img' draggable={false} />
							</div>
							<div className={styles.info}>
								<div className={styles.item__name}>{item.name}</div>
								<Stars item={item} />
								<Prices item={item} />
							</div>
						</div>
						<div className={styles.footer}>
							<p className={styles.footer__text}>{item.disclaimer}</p>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}

export default Item
