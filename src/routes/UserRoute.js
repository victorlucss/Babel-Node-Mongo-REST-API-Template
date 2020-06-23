import { UserController } from "../controller";
import { RetrieveFilters, CheckToken } from "../middleware";

export default class UserRoute {

    constructor(){
        this.controller = new UserController()
    }

    #registerRoutes(app){
        /* 
        * A ArrowFunction é necessária pra que os métodos não percam a instância do
        * Controller quando passarem os parâmetros. Caso não seja passado dessa forma
        * o UserController nunca vai ser iniciado e os atributos no contrutor não vão
        * estar disponíveis, gerando um erro de ponteiro vazio (this ficará = undefined).
        */

        app.post('/login', (req,res) => this.controller.login(req,res));
        app.get('/', [RetrieveFilters, CheckToken], (req,res) => this.controller.listUsers(req,res));
        app.post('/', [CheckToken], (req,res) => this.controller.saveUser(req,res));
        app.put('/:id', [CheckToken], (req,res) => this.controller.updateUser(req,res));
        app.delete('/:id', [CheckToken], (req,res) => this.controller.deleteUser(req,res));

        return app;
    }

    useRoute(app){
        app.use('/user', this.#registerRoutes(app))
    }


}