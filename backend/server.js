const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
// const bodyParser = require("body-parser");
const cors = require("cors");

const databaseConnect = require("./config/database");
const authRouter = require("./routes/authRoute");
const messengerRoute = require("./routes/messengerRoute");
dotenv.config({
  path: "backend/config/config.env",
});

app.use(cors({ origin: "http://localhost:3000", optionsSuccessStatus: 200 }));
app.use(cookieParser());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/messenger", authRouter);
app.use("/api/messenger", messengerRoute);

app.get("/", (req, res) => {
  res.send("ok");
});

databaseConnect();
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
