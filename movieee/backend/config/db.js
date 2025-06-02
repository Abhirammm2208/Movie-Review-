const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        // Remove debug line in production, keep for troubleshooting
        console.log('Connecting to MongoDB...');
        
        // Add connection options for better reliability
        const connectionOptions = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds instead of default 30
            family: 4 // Use IPv4, skip trying IPv6
        };

        await mongoose.connect(process.env.MONGO_URI, connectionOptions);
        console.log('MongoDB connected successfully!');
    } catch (err) {
        console.error('MongoDB connection error:', err.message);
        if (err.name === 'MongoParseError') {
            console.error('Please check your connection string format');
        } else if (err.name === 'MongoServerSelectionError') {
            console.error('Could not connect to any MongoDB servers');
            console.error('Please check your network or MongoDB Atlas settings');
        }
        // Don't immediately exit in development to allow for troubleshooting
        console.error('Failed to connect to MongoDB. Server will continue to run, but database functionality will be unavailable.');
    }
};

module.exports = connectDB;
