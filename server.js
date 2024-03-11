import express from "express";
import dotenv from "dotenv";

import { connect } from "./repositories/index.js";
import initAppRoute from "./routes/index.js";

// config environment
dotenv.config();

// new express instance
const app = express();

// app middleware
app.use(express.json());

// init app routes
const apiRoute = express.Router();
app.use("/api", apiRoute);

initAppRoute(apiRoute);

// start app
const start = async () => {
    const port = process.env.PORT || 3000;

    try {
        await connect();

        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        })
    } catch (error) {
        console.log(error);
    }
}

start();