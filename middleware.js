/* middleware for vercel edge */
import {jwtVerify} from 'jose';

/* matcher allows us to define which paths middleware should apply to */
export const config = {matcher: '/api/:path*'}

export default async function middleware(req) {
	// to disable middleware simply add a return statment
	// return;

	const authHeader = req.headers.get('authorization');

	// dealing with cors preflight requests
	if (req.method === 'OPTIONS') {
		return Response.json({}, {
			status: 200,
			headers: {
				'Access-Control-Allow-Headers': '*'
			}
		});
	}

	if (authHeader) {
		const accessToken = authHeader.split(' ')[1];
		const secret = new TextEncoder().encode(process.env.secret);

		try {
			// if accessToken verification fails following line will throw an error
			const payload = await jwtVerify(accessToken, secret);
			console.log(payload);
		} catch(err) {
			return Response.json(
				{'error': JSON.stringify(err)},
				{
					status: 401,
					headers: {
						'Content-Type': 'application/json',
						'WWW-Authenticate': 'Bearer'
					}
				}
			);
		}
	} else {
		return Response.json(
			{
				'error': 'authorization header was not found'
			},
			{
				status: 401,
				headers: {
					'Content-Type': 'application/json',
					'WWW-Authenticate': 'Bearer'
				}
			}
		);
	}
}
