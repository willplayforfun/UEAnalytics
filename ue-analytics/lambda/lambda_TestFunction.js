
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


exports.handler = function(event, context, callback) {
    // your server-side functionality	
	console.log('queryStringParameters', event.queryStringParameters);

	const subject = event.queryStringParameters.name || 'World';
	
	const fullMsg = "Hello, " + subject + "! (env TEST_VAR=" + process.env.TEST_VAR + ")";
	
	callback(null, {
		statusCode: 200,
		body: JSON.stringify({ msg: fullMsg })
	});
}
