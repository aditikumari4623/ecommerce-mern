const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const dotenv=require ("dotenv");

const errorMiddleware = require("./middleware/error");

//config
dotenv.config({path:"backend/config/config.env"});

// ✅ Body parser
app.use(express.json());

// ✅ Cookie parser
app.use(cookieParser());

// ✅ CORS (THIS FIXES YOUR NETWORK ERROR)
app.use(
  cors({
    origin: ["http://localhost:3000", process.env.FRONTEND_URL],
    credentials: true,
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

// Route Imports
const product = require("./routes/productroute");
const user = require("./routes/userroute");
const order = require("./routes/orderroute");
const payment = require("./routes/paymentroute");

// Routes
app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);

// Middleware for Errors
app.use(errorMiddleware);

module.exports = app;
