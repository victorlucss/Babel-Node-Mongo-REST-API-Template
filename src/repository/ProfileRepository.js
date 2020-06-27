import { ProfileModel } from "../model";
import { ThrowableError } from "../utils";
import { getMessage } from "../utils";

export default class ProfileRepository {
    /**
     * List all profiles in DB
     * @param {object} [filters={}]
     * @param {string[]} [includes=[]]
     * @memberof ProfileRepository
    */
    async findAll(filters = {}, includes = null){
        let profiles = await ProfileModel
            .find(filters)
            .populate(includes)

        return profiles
    }

    /**
     * Store a Profile in DB
     * @param {ProfileModel} profile
     * @memberof ProfileRepository
    */
    async store(profile){
        let storedProfile = await ProfileModel.create(profile);
        return storedProfile;

    }

    /**
     * Update roles in a Profile
     * @param {number[]} roles
     * @param {number} id
     * @memberof ProfileRepository
    */
    async update(roles, id){
        let foundProfile = await ProfileModel
            .findById(id);

        if(!foundProfile) {
            throw new ThrowableError(getMessage('profileNotFound')('id', id), 'MongoError', 404);
        }

        foundProfile.roles = roles

        await foundProfile.save();

        return foundProfile;
    }

    /**
     * Delete a Profile in DB
     * @param {number} id
     * @memberof ProfileRepository
    */
    async delete(id){
        let foundProfile = await ProfileModel.findById(id);

        if(!foundProfile) {
            throw new ThrowableError(getMessage('profileNotFound')('id', id), 'MongoError', 404);
        }

        await ProfileModel.deleteOne({ _id: id });

        return getMessage('profileDeleted')(id);
    }
}