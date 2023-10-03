import { FC, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { GrFormPrevious } from 'react-icons/gr'
import DataService from '../../services/DataService'
import { IItem } from '../../types/types'
import styles from './Item.module.scss'
import { priceConvert } from './../../utils/priceConvert'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRubleSign } from '@fortawesome/free-solid-svg-icons'

const Item: FC = () => {
	const [item, setItem] = useState<IItem | null>(null)
	const [newPrice, setNewPrice] = useState(['0', '0'])
	const [oldPrice, setOldPrice] = useState(['0', '0'])

	const navigate = useNavigate()

	const { id } = useParams()

	useEffect(() => {
		const handleFetchData = async () => {
			const response = await DataService.getById(id)
			setItem(response)
		}

		handleFetchData()
	}, [id])

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

	const starLength = item ? item.stars : 0

	const starElements = Array.from({ length: starLength }, (_, index) => (
		<AiFillStar className={styles.star} key={index} />
	))

	const nonStarElements = Array.from({ length: 5 - starLength }, (_, index) => (
		<AiOutlineStar className={styles.star} key={index} />
	))

	return (
		<div className={styles.wrapper}>
			<div className={styles.content}>
				<div className={styles.button_back} onClick={() => navigate('/')}>
					<GrFormPrevious />
					{'Назад'}
				</div>
				{item !== null && (
					<div className={styles.item}>
						<div className={styles.header}>
							<div
								className={styles.discount}
								style={{
									visibility: item.discount === 0 ? 'hidden' : 'visible',
								}}
							>
								-{item.discount}%<span className={styles.triangle}></span>
							</div>
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
								<div className={styles.stars}>
									{starElements}
									{nonStarElements}
								</div>
								<div className={styles.prices}>
									<div className={styles.old_price}>
										{oldPrice[0] !== '0' && (
											<>
												<div className={styles.price}>
													<div className={styles.int}>{oldPrice[0]}</div>
													<div className={styles.float}>{oldPrice[1]}</div>
													<FontAwesomeIcon
														icon={faRubleSign}
														className={styles.value}
													/>
													<div className={styles.line}></div>
												</div>
												<div className={styles.text}>старая цена</div>
											</>
										)}
									</div>
									<div className={styles.new_price}>
										<div className={styles.price}>
											<div className={styles.int}>{newPrice[0]}</div>
											<div className={styles.float}>{newPrice[1]}</div>
											<FontAwesomeIcon
												icon={faRubleSign}
												className={styles.value}
											/>
										</div>
										<div className={styles.text}>цена по акции</div>
									</div>
								</div>
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
