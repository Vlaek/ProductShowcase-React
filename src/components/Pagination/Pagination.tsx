import { FC } from 'react'
import { GrFormNext, GrFormPrevious } from 'react-icons/gr'
import styles from './Pagination.module.scss'

const Pagination: FC = () => {
	return (
		<div className={styles.pagination}>
			<div className={styles.pagination__page}>
				<GrFormPrevious />
			</div>
			<div className={styles.pagination__page}>1</div>
			<div className={styles.pagination__page}>2</div>
			<div className={styles.pagination__page}>3</div>
			<div className={styles.pagination__page}>
				<GrFormNext />
			</div>
		</div>
	)
}

export default Pagination
