import path from "path";
import app from "./app.js";
import chalk from "chalk";


import environment from "./config/environment.js"

console.log(chalk.yellow(`[SERVER] Starting in ${chalk.bold(String(environment.nodeEnv).toUpperCase())}, wait few seconds...`));
app.listen(environment.appPort)
console.log(chalk.greenBright(`[SERVER] Started in port ${environment.appPort}`));

