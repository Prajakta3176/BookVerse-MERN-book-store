import express from "express";
const server = express();
import cors from 'cors';


// private variable file
import dotenv from "dotenv";
dotenv.config();

// database connection
import conn from "./connections/connection.js";
conn();

import userRouter from "./routes/user.js";
import bookRouter from "./routes/book.js";
import favRouter from "./routes/favorite.js";
import cartRouter from "./routes/cart.js";
import orderRouter from "./routes/order.js";

// middleware
server.use(cors());
server.use(express.json());
server.use('/assets', express.static('assets'));


//routes
server.use("/", userRouter);
server.use("/", bookRouter);
server.use("/", favRouter);
server.use("/", cartRouter);
server.use("/", orderRouter);

// creating port
server.listen(process.env.PORT, () => {
  console.log("Server is running");
});
