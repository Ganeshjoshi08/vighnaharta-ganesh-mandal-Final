const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected ✅");
    console.log("Host:", mongoose.connection.host);
    console.log("Database:", mongoose.connection.name);
    console.log("URI:", process.env.MONGO_URI);

  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectDB;