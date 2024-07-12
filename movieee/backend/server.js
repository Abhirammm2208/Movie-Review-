const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Init Middleware
app.use(express.json());
app.use(cookieParser());

// Connect Database
connectDB();


// CORS configuration
app.use(cors({
	origin: [
		'*',
		`${process.env.CLIENT_URL}`,
	],
	credentials: true
}));

app.options('*', cors());

// Define Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/reviews', require('./routes/reviews'));

app.get("/", async (req, res) => {
	return res.status(200).send({ message: "App is running" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

module.exports = app;
