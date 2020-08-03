
// When you call a serverless function’s endpoint, 
// the handler receives an event object similar to 
// what you would receive from the AWS API Gateway
// {
// 	"path": "Path parameter",
// 	"httpMethod": "Incoming request's method name"
// 	"headers": {Incoming request headers}
// 	"queryStringParameters": {query string parameters }
// 	"body": "A JSON string of the request payload."
// 	"isBase64Encoded": "A boolean flag to indicate if the applicable request payload is Base64-encode"
// }

// The context parameter includes information about the 
// context in which the serverless function was called, 
// like certain Identity user information, for example.

// example of async handler using async-await

import axios from "axios"

export async function handler(event, context) {
	try {
		const response = await axios.get("https://icanhazdadjoke.com", { headers: { Accept: "application/json" } })
		const data = response.data
		return {
			statusCode: 200,
			body: JSON.stringify({ msg: data.joke })
		}
	} catch (err) {
		console.log(err) // output to netlify function log
		return {
			statusCode: 500,
			body: JSON.stringify({ msg: err.message }) // Could be a custom message or object i.e. JSON.stringify(err)
		}
	}
}