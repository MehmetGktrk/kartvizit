const moment = require('moment-timezone');


async function timeMiddleware(req, res, next) {
    try {
        const newYorkUnixTimestamp = moment.tz("America/New_York").unix();
        req.time = newYorkUnixTimestamp;
        next();
    } catch (err) {
        console.error('Time Not Found');
        return res.status(500).json({ code: 500, message: 'Time Not Found' })
    }
}


module.exports = timeMiddleware;