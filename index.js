const express = require("express");
const bodyParser = require("body-parser");
const morgan = require('morgan')
const helmet = require("helmet");
const chalk = require('chalk');
const cors = require('cors')
const mongoose = require("mongoose");

// express app
const app = express();

const CartRouter = require("./routes/Cart.routes");
const CategoryRoute = require("./routes/Category.routes");
const OrderRouter = require("./routes/Order.routes");
const UserRouter = require("./routes/User.routes");
const TrafficDeviceRoute = require("./routes/TrafficDevice.routes");
const ProductRouter = require("./routes/Product.routes");

const errorHandler = require("./middlewares/errorHandler");
const verifyToken = require("./middlewares/verifyJwtToken");
// const sendMessageToEmail = require("./utility/sendMessageToEmail");

const port = 4000 || process.env.PORT;

// Enable CORS 
app.use(cors())
require("dotenv").config();
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use(morgan('tiny'))
app.use(helmet())

// database connection
mongoose.set('strictQuery', false);
mongoose
  .connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(chalk.green("Database connection successful!")))
  .catch((err) => console.log(chalk.red(err)));

// app.use(sendMail)

// all routes
app.use("/api/auth", UserRouter);
app.use("/api/cart", CartRouter);
app.use("/api/category", CategoryRoute);
app.use("/api/product", ProductRouter);
app.use("/api/order", OrderRouter);
app.use("/api/traffic-device", TrafficDeviceRoute);

app.get("/", verifyToken, async (req, res) => {
  res.json({
    message: "Hello World"
  })
})

// app.post("/mail", sendMail)

app.use(errorHandler)


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
