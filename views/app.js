const mongoose = require("mongoose");
const express = require("express");
const app = express();
const connectDB = require("../config/dbConn");
const cors = require("cors");
const corsOptions = require("../config/corsOption");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const PORT = process.env.PORT || 3500;

//Connect to MongoDB
connectDB();
//Cross Origin Resource Sharing
app.use(cors(corsOptions));
//Parses incoming requests with URL-encoded payloads.
app.use(express.urlencoded({ extended: false }));
//Built-in middleware for json
app.use(express.json());
//Middleware for cookies
app.use(cookieParser());

app.use("/room", require("../routes/api/room"));

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
