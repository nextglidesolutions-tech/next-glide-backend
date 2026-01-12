const serverless = require('serverless-http');
const { app, connectDB } = require('../server');

const handler = serverless(app);

module.exports.handler = async (event, context) => {
    // Prevent serverless from waiting for the DB connection to close
    context.callbackWaitsForEmptyEventLoop = false;

    // Ensure DB is connected before handling the request
    await connectDB();

    return handler(event, context);
};
