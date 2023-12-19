/* middleware for vercel edge */
import {jwtVerify} from 'jose';
import { next } from '@vercel/edge';

export const config = {matcher: '/api:Path*'}

export default async function middleware(req) {
  const authHeader = req.headers.get('authorization');

  console.log('method:', req.method);

  if (req.method === 'OPTIONS') {
	//next();
	return Response.json({
		'status': 'ok'
	}, {
		status: 200,
		headers: {
			'Access-Control-Request-Headers': '*'
		}
	}
	);
  }

  console.log(authHeader);

  if (authHeader) {
    const token = authHeader.split(' ')[1];
    const secret = new TextEncoder().encode(process.env.secret);
    console.log(token, process.env.secret);

    try {
      const payload = await jwtVerify(token, secret);
      console.log(payload);
      next();
    } catch(err) {
      return Response.json(
		{
			'error': JSON.stringify(err)
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
  } else {
    return Response.json(
		{
			'error': 'authorization header not found'
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
