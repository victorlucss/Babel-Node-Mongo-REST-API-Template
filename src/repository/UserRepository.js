import { UserModel } from "../model";
import { ThrowableError } from "../utils";
import { getMessage } from "../utils";

export default class UserRepository {
    /**
     * List all users in DB
     * @param {string[]} [filters=[]]
     * @memberof UserRepository
    */
    async findAll(filters = {}){
        let users = await UserModel
            .find(filters)
            .select("-password");

        return users
    }

    /**
     * List all users in DB filtering by e-mail and return the encoded password
     * @param {string} email
     * @memberof UserRepository
    */
   async findOneByEmail(email){
    let foundUser = await UserModel
        .findOne({
            email: email
        });
    
    if(!foundUser) {
        throw new ThrowableError(getMessage('userNotFound')(email), 'MongoError', 404);
    }

    return foundUser
}

    /**
     * Store an User in DB
     * @param {UserModel} user
     * @memberof UserRepository
    */
    async store(user){
        let storedUser = await UserModel.create(user);
        return storedUser;

    }

    /**
     * Update an User in DB
     * @param {UserModel} user
     * @param {number} id
     * @memberof UserRepository
    */
    async update(user, id){
        let foundUser = await UserModel
            .findById(id)
            .select("-password");

        delete user["password"];

        if(!foundUser) {
            throw new ThrowableError(getMessage('userNotFound')(id), 'MongoError', 404);
        }

        Object.keys(user).map(key => {
            foundUser[key] = user[key]
        })

        await foundUser.save();

        return user;
    }

    /**
     * Delete an User in DB
     * @param {number} id
     * @memberof UserRepository
    */
    async delete(id){
        let foundUser = await UserModel.findById(id);

        if(!foundUser) {
            throw new ThrowableError(getMessage('userNotFound')(id), 'MongoError', 404);
        }

        await UserModel.deleteOne({ _id: id });

        return `User with id ${id} deleted!`;
    }
}