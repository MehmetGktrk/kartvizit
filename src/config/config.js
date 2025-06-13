require('dotenv').config();

module.exports = {
    mongoURI: process.env.MONGO_URI,
    databaseName: process.env.DATABASE_NAME,
    port: process.env.PORT || 4000,
    jwtSecret: process.env.JWT_SECRET

}