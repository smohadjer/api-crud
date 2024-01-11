Example of a secure serverless API that can be accessed from any domain. Requests to API should have a valid JWT token in the "Authorization" header. JWT verification is implemented via jose library using an Edge middleware on Vercel.

GET https://api-jwt.vercel.app/api
Content-Type: application/json
Authorization: Bearer yourAccessToken


Localhost
To run api on localhost you need to install vercel cli and then run command:
````
vercel dev
````
Then api endpoint will be available at: http://localhost:3000/api
