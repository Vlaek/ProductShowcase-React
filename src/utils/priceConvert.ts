export const priceConvert = (price: string | number) => {
	let pattern = ''

	if (typeof price === 'string') pattern = ','
	else pattern = '.'

	const [int, float] = String(price).split(pattern)

	if (float === undefined) return [int, '']
	else return [int, float.length < 2 ? float + '0' : float]
}
