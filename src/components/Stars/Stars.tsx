import { FC } from 'react'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { IItem } from '../../types/types'
import styles from './Stars.module.scss'

interface StarsProps {
	item: IItem
}

const Stars: FC<StarsProps> = ({ item }) => {
	const starLength = item ? item.stars : 0

	const starElements = Array.from({ length: starLength }, (_, index) => (
		<AiFillStar className={styles.star} key={index} />
	))

	const nonStarElements = Array.from({ length: 5 - starLength }, (_, index) => (
		<AiOutlineStar className={styles.star} key={index} />
	))

	return (
		<div className={styles.stars}>
			{starElements}
			{nonStarElements}
		</div>
	)
}

export default Stars
