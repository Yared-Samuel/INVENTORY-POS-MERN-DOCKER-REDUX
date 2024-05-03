const dotenv = require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
const errorHandler = require("./middleware/errorMiddleware");
const cookieParser = require("cookie-parser");
const categoryRoute = require("./routes/categoryRoute");
const storeListRoute = require("./routes/storelistRoute");
const invRoute = require("./routes/invRoute");
const priceRoute = require("./routes/priceRoute");
const serveRoute = require("./routes/serveListRoute");
const reportRoute = require("./routes/reportRoute");
const analyzeRoute = require("./routes/analyzeRoute");
const morgan = require("morgan");
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();

const HOST_IP = process.env.HOST_IP;
app.use(cors({
  origin: [`http://${HOST_IP}:3000`,"http://192.168.1.19:3000","http://100.94.71.87:3000","http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "DELETE", "UPDATE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200
}))




app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(morgan("combined"));


// Routes
app.get("/", (req, res) => {
  res.send("Home Page");
});
// Route Middleware
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/category", categoryRoute);
app.use("/api/storelist", storeListRoute);
app.use("/api/inv", invRoute);
app.use("/api/price", priceRoute);
app.use("/api/serve", serveRoute);
app.use("/api/report", reportRoute);
app.use("/api/analyze", analyzeRoute);



// Error middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000 ;
const MONGO_URI = process.env.MONGO_URI

// Connect to DB and start server

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT,'0.0.0.0',HOST_IP, () => {
      console.log(`Server runnning on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
