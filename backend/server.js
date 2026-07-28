import app from "./src/app.js";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import morgan from "morgan";

dotenv.config();

connectDB();

app.use(morgan("dev"));


app.listen(3000, (req, res) => {
  console.log("server is running on port 3000");
});
