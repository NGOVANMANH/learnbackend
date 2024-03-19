import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connect from "./config/connect.js";
import initAppRoute from "./routes/index.js";

// config environment
dotenv.config();

// new express instance
const app = express();

// app middlewares
app.use(cors());
app.use(express.json());

// init app routes
const apiRoute = express.Router();
app.use("/api", apiRoute);
initAppRoute(apiRoute);

// start app
const port = process.env.PORT || 3000;

connect()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        })
    })
    .catch(error => {
        console.log(error);
    })



