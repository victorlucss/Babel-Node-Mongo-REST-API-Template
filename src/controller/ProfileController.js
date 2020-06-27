import { ProfileRepository } from "../repository";
import { GlobalHandler, ThrowableError, getMessage } from "../utils";

export default class ProfileController {

    constructor(){
        this.repository = new ProfileRepository();
    }

    async listProfiles(req, res) {
        try {
            const filters = req.filters;
            const { includes } = req.query;

            let profiles = await this.repository.findAll(filters, includes)
            res.send(profiles)
        } catch(error){
            const sanitizedError = GlobalHandler.handle(error);

            res.status(sanitizedError.code).send(sanitizedError)
        }
    }

    async saveProfile(req, res) {
        try {
            const profile = req.body;

            let savedProfile = await this.repository.store(profile)
            res.send(savedProfile)
        } catch (error){
            const sanitizedError = GlobalHandler.handle(error);

            res.status(sanitizedError.code).send(sanitizedError)
        }
    }

    async updateProfileRoles(req, res) {
        try {
            const { id } = req.params;
            const roles = req.body;

            if(!Array.isArray(roles)) throw new ThrowableError(getMessage('bodyMustBeArray')('roles'), 'ValidationError', 400);

            let updatedProfile = await this.repository.update(roles, id)
            res.send(updatedProfile)
        } catch (error){
            const sanitizedError = GlobalHandler.handle(error);

            res.status(sanitizedError.code).send(sanitizedError)
        }
    }

    async deleteProfile(req, res) {
        try {
            const { id } = req.params;

            await this.repository.delete(id)
            res.json({
                message: `Profile with id ${id} successful deleted!`
            })
        } catch (error){
            const sanitizedError = GlobalHandler.handle(error);

            res.status(sanitizedError.code).send(sanitizedError)
        }
    }
}