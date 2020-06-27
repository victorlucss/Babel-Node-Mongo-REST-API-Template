import { RoleModel } from "../model";
import { ThrowableError } from "../utils";
import { getMessage } from "../utils";

export default class RoleRepository {
    /**
     * List all roles in DB
     * @param {object} [filters={}]
     * @memberof RoleRepository
    */
    async findAll(filters = {}){
        let roles = await RoleModel
            .find(filters)

        return roles
    }

    /**
     * Store a Role in DB
     * @param {RoleModel} role
     * @memberof RoleRepository
    */
    async store(role){
        let storedRole = await RoleModel.create(role);
        return storedRole;

    }

    /**
     * Delete a Role in DB
     * @param {number} id
     * @memberof RoleRepository
    */
    async delete(id){
        let foundRole = await RoleModel.findById(id);

        if(!foundRole) {
            throw new ThrowableError(getMessage('profileNotFound')('id', id), 'MongoError', 404);
        }

        await RoleModel.deleteOne({ _id: id });

        return getMessage('profileDeleted')(id);
    }
}