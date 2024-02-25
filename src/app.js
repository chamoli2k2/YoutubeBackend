import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";

// Making express app
const app = express();

// Cookie
app.use(cookieParser());

// Enabling the cors (From all origin)
app.use(cors());

// Enabling the json from express
app.use(express.json({ limit: "32kb" }));

// Enabling the url encoded
app.use(express.urlencoded({ extended: true }));

// Serving the static file in public folder
app.use(express.static("public"));

// rotues declartion ( It's necessary to use middleware if we separte the route )
app.use("/api/v1/users", userRouter);

export { app };
