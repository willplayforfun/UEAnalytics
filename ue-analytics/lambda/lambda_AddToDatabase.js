
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

// The callback works much like the same parameter in an 
// AWS Lambda function. Your handler should use the 
// callback to return either an error (as the first parameter) 
// or a response object, such as:
// {
// 	"isBase64Encoded": true|false,
// 	"statusCode": httpStatusCode,
// 	"headers": { "headerName": "headerValue", ... },
// 	"body": "..."
// }

//https://www.netlify.com/blog/2018/07/09/building-serverless-crud-apps-with-netlify-functions-faunadb/?_ga=2.102792000.1775875027.1596311592-1447363814.1595897486
//https://github.com/netlify/netlify-faunadb-example/blob/f965df497f0de507c2dfdb1a8a32a81bbd939314/scripts/bootstrap-fauna-database.js

import faunadb from 'faunadb' /* Import faunaDB sdk */

const result = dotenv.config()
if (result.error) 
{
	throw result.error
}
console.log(result.parsed)

/* configure faunaDB Client with our secret */
const q = faunadb.query
const client = new faunadb.Client({
	secret: process.env.FAUNADB_SERVER_SECRET
})

/* export our lambda function as named "handler" export */
exports.handler = (event, context, callback) => {
	/* parse the string body into a useable JS object */
	const data = JSON.parse(event.body)
	
	console.log("Function `AddToDatabase` invoked with JSON payload", data)
	
	const todoItem = {
		data: data
	}
	
	/* construct the fauna query */
	client.query(q.Create(q.Ref("classes/todos"), todoItem))
	
	/* react to Fauna's response and provide an answer to the caller */
	.then((response) => {
		console.log("AddToDatabase success", response)
		/* Success! return the response with statusCode 200 */
		callback(null, {
			statusCode: 200,
			body: JSON.stringify(response)
		})
	}).catch((error) => {
		console.error("AddToDatabase error", error)
		/* Error! return the error with statusCode 400 */
		/*
		callback(null, {
			statusCode: 400,
			body: JSON.stringify(error)
		})
		*/
		callback(error);
	})
}