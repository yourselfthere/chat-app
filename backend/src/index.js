import express from "express";
import dotenv from "dotenv";
const app = express();

import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js"; //need to put .js in the end because you are using type module
dotenv.config();
const PORT = process.env.PORT;
app.use(express.json()); //middleware to parse JSON request bodies
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log("server is running on PORT:" + PORT);
  connectDB();
});
