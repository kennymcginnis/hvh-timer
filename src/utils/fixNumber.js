const energyNumber = fixNumber(Array.from(Array(60).keys()))

function fixNumber(value) {
	value = value.map(hour => {
		if (hour < 10) {
			hour = '0' + hour
		}
		return hour
	})
	return value
}

export { energyNumber }
