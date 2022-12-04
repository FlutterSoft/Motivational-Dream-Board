const mongoose = require("mongoose");

// Connect to MongoDB Database using Mongoose and the DB_STRING in the config/.env file
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_STRING, {
      
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;
