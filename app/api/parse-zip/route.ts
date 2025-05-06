import nexios from 'nexios';

export async function GET(req: Request) {
	const { searchParams } = new URL(req.url);

	const location = searchParams.get('location');

	let url = '';

	if (location)
		url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(
			location,
		)}`;

	try {
		let response = await nexios.get(url, { timeout: 10000 });

		if (response.data.length === 0) return new Response('Location not found', { status: 400 });

		const data = response.data[0];

		const location: string = data.display_name;
		const lat = data.lat;
		const lon = data.lon;

		if (lat && lon) {
			const reverseUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`;

			response = await nexios.get(reverseUrl, { timeout: 10000 });
			const zip: number = response.data?.address?.postcode;

			return new Response(zip.toString());
		}
	} catch (err) {
		console.log(err);
		return new Response(err as string, { status: 500 });
	}
}
