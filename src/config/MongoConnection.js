import mongoose from "mongoose";
import environment from "./environment";
import chalk from "chalk";

export default class MongoConnection {
    constructor(){
        this.port = environment.dbConfig.port;
        this.host = environment.dbConfig.host;
    }

    async connect() {
        console.log(chalk.yellow(`[MONGO] Connecting, wait few seconds...`));

        const config = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        }

        mongoose.connection.on("connected", () => {
            console.log(chalk.greenBright(`[MONGO] Conected!`));
        })

        mongoose.connection.on("disconnected", () => {
            console.log(chalk.redBright(`[MONGO] Disconected! I'll try to reconect.`));
            
            setTimeout(() => {
                mongoose
                    .connect(this.host, config)
                    .catch((err) => console.log(chalk.redBright(`[MONGO] Connection error: ${err.message}`)))
            }, 30000)
        })

        mongoose
            .connect(this.host, config)
            .catch((err) => console.log(chalk.redBright(`[MONGO] Connection error: ${err.message}`)))
  }
}