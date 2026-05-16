require("dotenv").config();

const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();


const connectDb = require("./config/db");
const authRoutes = require("./routes/authRoutes")
const userRoutes = require("./routes/userRoutes");

app.use(express.json());
app.use(cookieParser());

connectDb();

app.use("/api/auth", authRoutes);

app.use("/api/user", userRoutes);

app.get("/", (req, res) => {
  res.send("API Running");
});

app.listen(process.env.PORT, ()=>{
    console.log("server started!");
});