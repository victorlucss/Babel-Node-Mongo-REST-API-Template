import MongoConnection from "./config/MongoConnection";
import bodyParser from "body-parser";
import Routes from "./routes";
import express from "express";
import morgan from "morgan";
import cors from "cors";

// Middlewares
import {
    Cors,
} from "./middleware";



let dbConnection = new MongoConnection();
dbConnection.connect();

import {
    UserModel,
} from "./model";

const app = express();

app.use(morgan("tiny"))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cors())
app.use(Cors)

app.use('/api', new Routes(express.Router()).registerRoutes())

export default app