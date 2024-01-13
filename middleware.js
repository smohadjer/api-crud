/* middleware for vercel edge */
import {jwtVerify} from 'jose';

/* matcher allows us to define which paths middleware should apply to */
export const config = {matcher: '/api/:path*'}

const errorResponse = (error) => {
	return Response.json(
		{ 'error': error },
		{
			status: 401,
			headers: {
				'Content-Type': 'application/json',
				'WWW-Authenticate': 'Bearer'
			}
		}
	);
};

export default async function middleware(req) {
	// to disable middleware simply add a return statment
	// return;

	const authHeader = req.headers.get('authorization');
	console.log(authHeader);

	// if request is a cors preflight request return 200
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
			// if accessToken is invalid jwtVerify throws error
			const payload = await jwtVerify(accessToken, secret);
			console.log(payload);
		} catch(err) {
			return errorResponse(JSON.stringify(err));
		}
	} else {
		return errorResponse('Authorization header not found!');
	}
}
