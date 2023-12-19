/* middleware for vercel edge */
import {jwtVerify} from 'jose';
import { next } from '@vercel/edge';

export const config = {matcher: '/api:Path*'}

export default async function middleware(req) {
	const authHeader = req.headers.get('authorization');

	// for preflight requests
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
			const payload = await jwtVerify(accessToken, secret);
			console.log(payload);
			next();
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
