import dotenv from "dotenv"
dotenv.config()

export default {
    nodeEnv: process.env.NODE_ENV,
    appPort: process.env.APP_PORT || 3000,
    encryptText: process.env.ENCRYPT_TEXT || "CHANGE_ENCRYPT_TEXT_NOW_PLEASE",
    privateJWT: process.env.PRIVATE_KEY || "CHANGE_PRIVATE_KEY_NOW_PLEASE",
    dbConfig: {
        port: process.env.DB_PORT,
        host: (process.env.NODE_ENV === "prod") ? process.env.DB_PROD : process.env.DB_DEV
    }
}