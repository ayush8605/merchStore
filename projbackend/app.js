require("dotenv").config(); // to use the environment variables set in .env file
const mongoose = require("mongoose");

const express = require("express");
const app = express();
const bodyParser = require("body-parser"); // used to parse the request object in an http request
const cookieParser = require("cookie-parser"); // To access the cookies stored in the user's browser
const cors = require("cors");

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

// connect to the mongoDB
// toStart : "C:\Program Files\MongoDB\Server\4.2\bin\mongo.exe"
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
  });

//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//My Routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);

const port = process.env.PORT; // Port number

// starting server and listening at port
app.listen(port, () => {
  console.log(`serrver is running at port number ${port}`);
});
