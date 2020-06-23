class GlobalHandler {
    constructor(){
        this.errorTypes = {
            'MNGE': 'MongoError',
            'VDTE': 'ValidationError',
            'ITRE': 'InternalError',
        }
    }

    makeError(message = 'Internal Server error!', code = 500, type = 'ITRE'){
        const errorName = (this.errorTypes[type]) ? this.errorTypes[type] : this.errorTypes['ITRE']

        return {
            message,
            code,
            name: errorName, 
        }
    }

    #handleMongoError(error) {
        if(error.code && error.code === 11000 && error.keyPattern){
            const violatedKeys = Object.keys(error.keyPattern);
            return this.makeError(`${violatedKeys.join(',')} already exist`, 422, 'MNGE')
        }else if(error.message) {
            let errorCode = (error.code) ? error.code : 400;
            return this.makeError(error.message, errorCode, 'VDTE')
        }

        console.error(error);
        return this.makeError()

    }

    #handleYupError(error) {
        if(error.type && error.type === 'required' && error.path){
            return this.makeError(`${error.path} is required!`, 400, 'VDTE');
        }else if(error.message) {
            let errorCode = (error.code) ? error.code : 400;
            return this.makeError(error.message, errorCode, 'VDTE')
        }

        console.error(error);
        return this.makeError()
    }

    handle(error) {
        if(error){
            if(error.name === 'MongoError'){
                return this.#handleMongoError(error);
            }else if(error.name === 'ValidationError'){ // O Mongoose também poder jogar excessão ValidationError, validar isso dps
                return this.#handleYupError(error);
            }
        }

        console.error(error);
        return this.makeError();
    }
}

export default new GlobalHandler();