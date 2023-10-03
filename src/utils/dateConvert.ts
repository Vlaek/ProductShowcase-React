export const dateConvert = (date: string) => {
	const [month, day, year] = date.split('/')

	return `${+day < 9 ? `0${day}` : day}.${
		+month < 9 ? `0${month}` : month
	}.${year}`
}
