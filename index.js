const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { connectDB } = require("./Config/db");
const { userRoutes } = require("./Routes/Users.routes");
const { calculate } = require("./Controller/calculate.controller");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("This is the home route for mock 12 backend");
});

app.use("/users", userRoutes);

app.post("/calculate", calculate);

app.listen(process.env.PORT, async () => {
  try {
    await connectDB;
    console.log("Connected to DB");
  } catch (error) {
    console.log(error);
  }
  console.log(`http://localhost:${8080}/`);
});
