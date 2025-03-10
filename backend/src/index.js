import express from "express";
const app = express();
import authRoutes from "./routes/auth.route.js"; //need to put .js in the end because you are using type module
app.use("/api/auth", authRoutes);

app.listen(5001, () => {
  console.log("server is running on port 5001");
});
