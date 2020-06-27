import { GlobalHandler, ThrowableError, getMessage } from "../utils";

export const HasRoles = function(roles = []) {
    return [
        (req,res,next) => {
            try {
                if(req.decoded && req.decoded.roles) {
                    if(req.decoded.roles.length == 0) throw new ThrowableError(getMessage('unauthorizedAccess'), 'AuthorizationError', 403);
                    req.decoded.roles.forEach(role => {
                        if(!roles.includes(role)) {
                            throw new ThrowableError(getMessage('roleNotPresent')(role), 'AuthorizationError', 403);
                        }
                    })
        
                    next();
                } else throw new ThrowableError(getMessage('unauthorizedAccess'), 'AuthorizationError', 403);
        
            } catch (error) {
                const sanitizedError = GlobalHandler.handle(error);
        
                return res.status(sanitizedError.code).send(sanitizedError)
            }      
        }
    ];
}