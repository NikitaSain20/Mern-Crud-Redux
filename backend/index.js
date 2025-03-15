require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 5000;
const userRouter = require("./routes/crud");
if (!process.env.mongoURL) {
  console.error("Error: mongoURL is not defined in .env file");
  process.exit(1); // Stop the server if DB URL is missing
}
mongoose
  .connect(process.env.mongoURL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));
const cors = require("cors");
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "DELETE", "PUT"],
  })
);

app.use(express.json());
app.use("/", userRouter);
app.listen(PORT, () => {
  console.log("Server Started Successfully!!");
});
