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

const corsPreflightResponse = () => {
	return Response.json({}, {
		status: 200,
		headers: {
			'Access-Control-Allow-Headers': '*'
		}
	});
};

export default async function middleware(req) {
	// to disable middleware uncomment following line
	// return;

	const authHeader = req.headers.get('authorization');

	if (req.method === 'OPTIONS') {
		return corsPreflightResponse();
	}

	if (authHeader) {
		const accessToken = authHeader.split(' ')[1];
		const secret = new TextEncoder().encode(process.env.secret);

		try {
			// if accessToken is invalid jwtVerify throws error
			const payload = await jwtVerify(accessToken, secret);
			console.log(payload);
			// we don't return a response so request is is handled next by api
		} catch(err) {
			return errorResponse(JSON.stringify(err));
		}
	} else {
		return errorResponse('Authorization header not found!');
	}
}
