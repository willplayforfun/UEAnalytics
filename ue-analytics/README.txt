
https://docs.netlify.com/configure-builds/file-based-configuration/#sample-file
netlify.toml
 - the "Build" section configures the way that Netlify builds and deploys the app to the web. For example, "functions" is the directory that Netlify will look in for built lambda functions

package.json
 - this is for npm, the package manager used for create-react-app
 

When running `netlify dev`, lambda functions are available at http://localhost:8888/.netlify/functions/function-name
You can also run these commands:
netlify functions:list
netlify functions:create
netlify functions:invoke


https://github.com/netlify/cli/blob/master/docs/netlify-dev.md#using-add-ons


Normally, environment variables (i.e. `process.env.x`) are added through the Netlify web interface. For local development of lambda functions, we can use dotenv:

https://github.com/netlify/netlify-lambda/issues/118
https://community.netlify.com/t/support-guide-using-environment-variables-on-netlify-correctly/267/5

A `.env.local` file should contain any secret keys (i.e. for DB) for development. The production keys are entered through the Netlify web interface.
FAUNADB_SERVER_SECRET, FAUNADB_SERVER_KEY_NAME, FAUNADB_SERVER_KEY_ID


`webpack.lambda.js` is a script used when building the lambda functions (in `lambda/` directory) to include DotEnv (and other required modules/plugins).


https://docs.fauna.com/fauna/current/drivers/javascript
https://github.com/netlify/addons


https://functions-playground.netlify.app/