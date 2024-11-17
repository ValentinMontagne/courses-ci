require("dotenv").config();
const express = require("express");
const app = express();
const { logger } = require("./middleware/logger");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const PORT = process.env.PORT || 3600;

app.use(logger);

app.use(cors(corsOptions));

app.use(express.json());

app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("API WORKING");
});

app.use("/auth", require("./routes/authRoutes"));
app.use("/users", require("./routes/userRoutes"));
app.use("/rooms", require("./routes/roomRoutes"));
app.use("/reservations", require("./routes/reservationRoutes"));

app.all("*", (req, res) => {
  res.json("404");
});

app.listen(PORT);
