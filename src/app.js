const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const path = require("path");

const databaseMiddleware = require('./middlewares/databaseMiddleware');
const timeMiddleware = require('./middlewares/timeMiddleware');
const authMiddleware = require('./middlewares/authMiddleware');
const authorizeRole = require('./middlewares/roleMiddleware');

const authRoutes = require('./routes/authRoutes');
const cardRoutes = require('./routes/cardRoutes');
const adminRoutes = require('./routes/adminRoutes');
const superAdminRoutes = require('./routes/superAdminRoutes');

const pageRoutes = require('./routes/pageRoutes');





const app = express();

app.use(express.static(path.join(__dirname, 'public')));


app.use(cors({
    origin: ['http://localhost:5500', 'http://127.0.0.1:5500'],
    credentials: true
}));

app.use(bodyParser.json());
app.use(cookieParser());

app.use(databaseMiddleware);
app.use(timeMiddleware);




app.use('/', pageRoutes);

app.use('/api/auth', authRoutes)
app.use('/api/card', cardRoutes);
app.use('/api/admin', authMiddleware, authorizeRole(["admin", "superAdmin"]), adminRoutes);
app.use('/api/superAdmin', authMiddleware, authorizeRole(["superAdmin"]), superAdminRoutes);



module.exports = app;