export const handleFormatDate = (dateTimeString) => {
	let dateTime = new Date(dateTimeString);
	let userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
	let formattedTime = dateTime.toLocaleString('en-US', {
		hour: 'numeric',
		minute: 'numeric',
		hour12: true,
		timeZone: userTimeZone
	});

	console.log(typeof formattedTime);
	return formattedTime;
};
