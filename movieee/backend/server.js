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
// Using async IIFE to handle database connection
(async () => {
  try {
    await connectDB();
    // If successful, database is connected
  } catch (error) {
    console.error('Database connection wrapper error:', error);
    // Server will continue to run even if database connection fails
  }
})();


// Enhanced CORS configuration
app.use(cors({
	origin: [
		'*',
		'http://localhost:3000',
		'http://192.168.29.5:3000',
		'http://localhost:3001',
		`${process.env.CLIENT_URL}`,
	],
	credentials: true,
	methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
	allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Requested-With'],
	exposedHeaders: ['Set-Cookie', 'Date', 'ETag']
}));

// Pre-flight requests
app.options('*', cors());

// Set default headers for all responses
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Credentials', 'true');
	res.header('Access-Control-Allow-Origin', req.headers.origin);
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
	res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Authorization');
	next();
});

// Define Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/reviews', require('./routes/reviews'));

app.get("/", async (req, res) => {
	return res.status(200).send({ message: "App is running" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

module.exports = app;
