const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "/frontend/build")));
//app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/frontend/build", "index.html"));
});

app.use("/name", (req, res) => {
  res.json({
    msg: "Express App",
  });
});

//routes middleware
app.use("/users", require("./routes/user"));

//Catching 404 Error
app.use((req, res, next) => {
  const error = new Error("INVALID ROUTE");
  error.status = 404;
  next(error);
});

const PORT = 8000;
mongoose
  .connect(
    "mongodb+srv://rimap:H3Is2J8c82i8ZEaU@cluster0.mqxsxqj.mongodb.net/crud-app?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log(path.join(__dirname, "/frontend/build"));
    app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
  })
  .catch((err) => {
    console.log(err.message);
  });
