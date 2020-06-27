import { RoleRepository } from "../repository";
import { GlobalHandler, ThrowableError, } from "../utils";

export default class ProfileController {

    constructor(){
        this.repository = new RoleRepository();
    }

    async listRoles(req, res) {
        const filters = req.filters;

        let roles = await this.repository.findAll(filters)
        res.send(roles)
    }

    async saveRole(req, res) {
        try {
            const role = req.body;

            let savedRole = await this.repository.store(role)
            res.send(savedRole)
        } catch (error){
            const sanitizedError = GlobalHandler.handle(error);

            res.status(sanitizedError.code).send(sanitizedError)
        }
    }

    async deleteRole(req, res) {
        try {
            const { id } = req.params;

            await this.repository.delete(id)
            res.json({
                message: `Role with id ${id} successful deleted!`
            })
        } catch (error){
            const sanitizedError = GlobalHandler.handle(error);

            res.status(sanitizedError.code).send(sanitizedError)
        }
    }
}