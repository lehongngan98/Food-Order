import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import "dotenv/config";
import orderRouter from "./routes/orderRoute.js";

import bodyParser from "body-parser";

//app config
const app = express();
const port = 3000;

app.use(bodyParser.json());
//middleware
app.use(express.json());
app.use(cors());

//db connection
connectDB();

// img:1714900752702header_img.png
// see image http://localhost:3000/images/1714900752702header_img.png
app.use("/images", express.static("uploads"));

//api endpoints
app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
// test
app.get("/", (req, res) => {
  res.send("api working!");
});

app.listen(port, () => {
  console.log(`Server is running with http://localhost:${port}`);
});


