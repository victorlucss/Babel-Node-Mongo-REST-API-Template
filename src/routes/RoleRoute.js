import { RoleController } from "../controller";
import { RetrieveFilters, CheckToken, getMessage } from "../middleware";

export default class RoleRoute {

    constructor(){
        this.controller = new RoleController()
    }

    useRoute(app){
        app.get('/role', [RetrieveFilters, CheckToken], (req,res) => this.controller.listRoles(req,res));
        app.post('/role', [CheckToken], (req,res) => this.controller.saveRole(req,res));
        app.delete('/role/:id', [CheckToken], (req,res) => this.controller.deleteRole(req,res));
        return app
    }
}