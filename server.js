require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDb = require("./config/connectDb");

const app = express();

// Connect to MongoDB Database
connectDb();

app.use(cors());
app.use(express.json());

app.use("/api/v1/users", require("./routes/userRoutes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server started successfully at port:", PORT);
});
