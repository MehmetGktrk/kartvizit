const config = require('./config/config');
const app = require('./app');
const { connectDB } = require('./database/connection');




async function startServer() {
    try {
        await connectDB();
        app.listen(config.port, '0.0.0.0', () => {
            console.log(`Server Started At: http://localhost:${config.port}/`)
        })
    } catch (err) {
        console.error('Failed To Start The Server');
        process.exit(1);
    }
}


startServer();