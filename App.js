const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectDB = require("./Config/databaseConfig");

const prooductRoute = require("./Routes/productRout");

dotenv.config();
connectDB();

// middelware ro parse JSON request bodies
app.use(express.json());

app.use("/products", prooductRoute);

app.listen(process.env.PORT, () => {
  console.log("server is running on port ${process.env.PORT}");
});
