const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectDB = require("./Config/databaseConfig");

const productRoute = require("./Routes/productRout");
const userRoute = require("./Routes/userRoute");
dotenv.config();
connectDB();

// middelware ro parse JSON request bodies
app.use(express.json());

app.use("/products", productRoute);
app.use("/users", userRoute);
app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});
