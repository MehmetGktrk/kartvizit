require('dotenv').config();

module.exports = {
    mongoURI: process.env.MONGO_URI,
    databaseName: process.env.DATABASE_NAME,
    port: process.env.PORT,
    jwtSecret: process.env.JWT_SECRET

}