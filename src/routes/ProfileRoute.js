import { ProfileController } from "../controller";
import { RetrieveFilters, CheckToken, getMessage } from "../middleware";

export default class ProfileRoute {

    constructor(){
        this.controller = new ProfileController()
    }

    useRoute(app){
        app.get('/profile', [RetrieveFilters, CheckToken], (req,res) => this.controller.listProfiles(req,res));
        app.post('/profile', [CheckToken], (req,res) => this.controller.saveProfile(req,res));
        app.put('/profile/:id', [CheckToken], (req,res) => this.controller.updateProfileRoles(req,res));
        app.delete('/profile/:id', [CheckToken], (req,res) => this.controller.deleteProfile(req,res));
        return app
    }


}