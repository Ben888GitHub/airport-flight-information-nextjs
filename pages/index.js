import { retrieveFlightData } from '@/utils/astack-api';
import { handleFormatDate } from '@/utils/formatLocaleDate';
import { Inter } from 'next/font/google';
import { useState } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
	const [flightValues, setFlightValues] = useState({
		flightNum: '',
		flightDate: ''
	});
	const [flightData, setFlightData] = useState([]);

	const handleFlightValues = (e) => {
		setFlightValues((currentFlightValues) => ({
			...currentFlightValues,
			[e.target.name]: e.target.value
		}));
	};

	const handleFlightData = async () => {
		let newFlightData = await retrieveFlightData(flightValues);
		setFlightData(newFlightData);
	};
	console.log(flightData);
	return (
		<main className={`flex  flex-col items-center  p-16 ${inter.className}`}>
			<p className="text-3xl">AviationStack API Information</p>

			<div className="w-64 mx-auto mt-5">
				<form>
					<div className="mb-4">
						<label htmlFor="flight-number" className="block mb-2">
							Flight Number:
						</label>
						<input
							onChange={handleFlightValues}
							type="text"
							id="flight-number"
							name="flightNum"
							placeholder="Enter flight number"
							className="text-black w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
						/>
					</div>
					<div className="mb-4">
						<label htmlFor="flight-date" className="block mb-2 ">
							Flight Date:
						</label>
						<input
							onChange={handleFlightValues}
							type="date"
							id="flight-date"
							name="flightDate"
							className="text-black w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
						/>
					</div>
				</form>
				<div className="flex justify-center">
					<button
						// type="submit"
						disabled={
							flightValues.flightNum === '' || flightValues.flightDate === ''
						}
						className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
						onClick={handleFlightData}
					>
						Search
					</button>
				</div>
			</div>
			{flightData === 'Unknown Flight' && (
				<p className="text-2xl text-white text-center m-5">Unknown Flight</p>
			)}
			{flightData?.data?.length > 0 && (
				<div className="mx-auto">
					<p className="text-2xl text-white text-center m-5">
						{flightData?.data[0]?.airline?.name}
					</p>

					<p className="text-2xl text-white text-center m-5">
						Status: {flightData?.data[0]?.flight_status}
					</p>

					<div className="lg:flex md:flex  w-full  mx-auto">
						<div className="mr-7">
							<p className="text-2xl text-white mb-2">Departure:</p>
							<p className="text-lg mb-2">
								Airport: {flightData?.data[0]?.departure?.airport}{' '}
								{`(${flightData?.data[0]?.departure?.iata})`}
							</p>
							<p className="text-lg mb-2">
								Terminal: {flightData?.data[0]?.departure?.terminal}
							</p>
							<p className="text-lg mb-2">
								Gate: {flightData?.data[0]?.departure?.gate}
							</p>
							<p className="text-lg mb-2">
								Delay: {flightData?.data[0]?.departure?.delay}
							</p>
							<p className="text-lg mb-2">
								Scheduled:{' '}
								{handleFormatDate(flightData?.data[0]?.departure?.scheduled)}
							</p>
							<p className="text-lg mb-2">
								Actual:{' '}
								{flightData?.data[0]?.departure?.actual
									? handleFormatDate(flightData?.data[0]?.departure?.actual)
									: '-'}
							</p>
						</div>
						<div className=" lg:mt-0 md:mt-0 mt-3 ">
							<p className="text-2xl text-white mb-2">Arrival:</p>
							<p className="text-lg mb-2">
								Airport: {flightData?.data[0]?.arrival?.airport}{' '}
								{`(${flightData?.data[0]?.arrival?.iata})`}
							</p>
							<p className="text-lg mb-2">
								Terminal: {flightData?.data[0]?.arrival?.terminal}
							</p>
							<p className="text-lg mb-2">
								Gate: {flightData?.data[0]?.arrival?.gate}
							</p>
							<p className="text-lg mb-2">
								Delay: {flightData?.data[0]?.arrival?.delay}
							</p>
							<p className="text-lg mb-2">
								Scheduled:{' '}
								{handleFormatDate(flightData?.data[0]?.arrival?.scheduled)}
							</p>
							<p className="text-lg mb-2">
								Actual:{' '}
								{flightData?.data[0]?.arrival?.actual
									? handleFormatDate(flightData?.data[0]?.arrival?.actual)
									: '-'}
							</p>
							<p className="text-lg ">
								Baggage Belt: {flightData?.data[0]?.arrival?.baggage || '-'}
							</p>
						</div>
					</div>
				</div>
			)}
		</main>
	);
}
