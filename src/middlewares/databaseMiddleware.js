const { getDB } = require('../database/connection');

async function databaseMiddleware(req, res, next) {
    try {
        req.db = await getDB();
        next();
    } catch (err) {
        console.error('Database Connection Failed: ' + err);
        return res.status(500).json({ code: 500, message: 'Database Connection Failed'})
        
        
    }
    
}

module.exports = databaseMiddleware;