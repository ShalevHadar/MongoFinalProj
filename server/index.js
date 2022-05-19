// import all required dependencies for the software to run
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

// initialize environment configuration
dotenv.config();
const port = process.env.PORT;
const dbUrl = process.env.DB_PASS;

// setup http middlewares
const app = express();
app.use(express.json());
app.use(cors());

// create connection to db
mongoose.connect(dbUrl, (err) => {
  if (err) {
    console.log("Connection to DB fail");
    console.error(err);
  } else {
    console.log("Connection to DB succefful");
    app.listen(port, () => {
      console.log(`App is running on port: ${port}`);
    });
  }
});
