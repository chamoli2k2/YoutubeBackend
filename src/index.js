import connectDB from "./db/connect.db.js";
import dotenv from "dotenv";
import { PORT } from "./contants.js";
import { app } from "./app.js";

// Configuring the environment variable
dotenv.config({
  path: './.env'
})

// Connecting the DB (It return a promise)
connectDB()
  .then(() => {
    // Making the server that is running on port
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Mongodb connection failed!! ", err);
  });
