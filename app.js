import express from 'express'
import "dotenv/config";
import cors from 'cors'
import AuthController from "./users/auth-controller.js";
import HelloController from "./controllers/hello-controller.js"
import UserController from "./users/users-controller.js"
import TuitsController from "./controllers/tuits/tuits-controller.js";
import session from "express-session";
import mongoose from "mongoose";
//mongoose.connect("mongodb://127.0.0.1:27017/tuiter");
const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/tuiter'
mongoose.connect(CONNECTION_STRING);
const app = express()
app.use(
    cors({
        credentials: true,
        origin: process.env.FRONTEND_URL
    })
);
const sessionOptions = {
    secret: "any string",
    resave: false,
    saveUninitialized: false,
  };
  if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
      sameSite: "none",
      secure: true,
    };
  }
  app.use(session(sessionOptions));
  

app.use(express.json());
AuthController(app);
TuitsController(app);
HelloController(app)
UserController(app)
app.listen(process.env.PORT || 4000);