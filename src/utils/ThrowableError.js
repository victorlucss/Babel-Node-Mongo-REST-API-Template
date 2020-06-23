export default class ThrowableError {
    constructor(message, name, code = 400){
        this.message = message;
        this.name = name;
        this.code = code;
    }
}