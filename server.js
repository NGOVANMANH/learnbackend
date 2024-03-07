import express from "express";
import dotenv from "dotenv";

import { connect } from "./repositories/index.js";
import { userRoute } from "./routes/index.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/user", userRoute)

app.get("/", (req, res) => {
    res.send("Hello World");
})


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