module.exports = function ms(ms) {

	const roundTowardsZero = ms > 0 ? Math.floor : Math.ceil;

	return {

		hours: roundTowardsZero(ms / 3600000) % 24,

		minutes: roundTowardsZero(ms / 60000) % 60,

		seconds: roundTowardsZero(ms / 1000) % 60

	};
}
