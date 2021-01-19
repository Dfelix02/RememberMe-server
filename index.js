const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const authRoute = require("./routes/user");
const updateListRoute = require("./routes/list");

const app = express();
dotenv.config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log("server running"));

mongoose.connect(
  process.env.DB,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  () => {
    console.log("connected to db");
  }
);

//middlewares
app.use(cors());
app.use(express.json());
//route middlewares
app.use("/user", authRoute);
app.use("/update", updateListRoute);
