const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            // These options may not be needed for newer Mongoose versions
            // but including them doesn't hurt
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        
        console.log('MongoDB Connected');
        return conn;
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw error; // Propagate error to be handled by main error handler
    }
};

module.exports = connectDB;
