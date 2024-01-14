Example of a minimal secure serverless API implemented using Node.js and with Cors support so that it can be accessed from any domain. Requests to API should have a valid JWT token in the "Authorization" header. JWT verification is implemented via jose library. You can test this API by creating a JWT token at: https://jwt-oauth.vercel.app/

Example of a request:
````
GET https://api-jwt.vercel.app/api
Content-Type: application/json
Authorization: Bearer <JWTAccessToken>
````

To run api on localhost you need to install vercel cli and then run command:
````
vercel dev
````
API is now available at: http://localhost:3000/api


