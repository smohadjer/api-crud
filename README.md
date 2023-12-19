Example of a secure serverless API that can be accessed from any domain. Requests to API should have a valid JWT token in the "Authorization" header. JWT verification is implemented via jose library using an Edge middleware on Vercel.

