// let currentDate = new Date().toJSON().slice(0, 10);
// console.log(currentDate);

export const retrieveFlightData = async ({ flightNum, flightDate }) => {
	const axios = (await import('axios')).default;

	console.log(flightDate);
	console.log(flightNum, flightDate);
	const { data } = await axios.post('/api/avstack-api', {
		flightNum,
		flightDate
	});
	console.log(data);
	return data;
	// setFlightData(data);
};
