const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const authRoute = require("./routes/auth");

const app = express();
dotenv.config();

mongoose.connect(
  process.env.DB,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("connected to db");
  }
);

//middlewares
app.use(express.json());
//route middlewares
app.use("/api/user", authRoute);

app.listen(3000, () => console.log("server running"));
