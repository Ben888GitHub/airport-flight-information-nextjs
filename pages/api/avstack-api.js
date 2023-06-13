const handler = async (req, res) => {
	const axios = (await import('axios')).default;

	console.log(req.body);
	const { flightNum, flightDate } = req.body;
	// console.log(
	// 	`${process.env.API_KEY}?flight_number=${flightNum}&flight_date=${flightDate}`
	// );
	// console.log(flightDate);
	const { data } = await axios.get(
		`${process.env.API_KEY}?flight_number=${flightNum}&flight_date=${flightDate}`
	);
	console.log(data);

	data.data.length > 0
		? res.status(200).json(data)
		: res.status(200).json('Unknown Flight');
};

export default handler;
