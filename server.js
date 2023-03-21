require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const indexRouter = require("./routes/index");
const staffRouter = require("./routes/staff");
const studentRouter = require("./routes/student");
const grienvaceRouter = require("./routes/grievance");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

app.use("/api", indexRouter);
app.use("/api/staff", staffRouter);
app.use("/api/student", studentRouter);
app.use("/api/grievance", grienvaceRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/dist"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

mongoose.connect(process.env.MONGO_URI).then(() => {
  app.listen(process.env.PORT, () => {
    console.log(
      `Connected to MongoDB\nServer running on port ${process.env.PORT}`
    );
  });
});

module.exports = app;
