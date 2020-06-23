import bcrypt from "bcrypt";
import environment from "../config/environment";

export const encrypt = (text) => {
    const string = `${environment.encryptText}-${text}`
    let salt = bcrypt.genSaltSync(parseInt(process.env.SALT_ROUNDS))
    return bcrypt.hashSync(string, salt)
}
export const checkEncrypt = (text, checkText) => {
    let string = `${environment.encryptText}-${text}`
    return bcrypt.compareSync(string, checkText.toString())
}