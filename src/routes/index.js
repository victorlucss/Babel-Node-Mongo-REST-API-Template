import UserRoute from "./UserRoute";

export default class Routes {
    constructor(app){
        this.app = app;
        this.routes = [
            UserRoute,
        ];
    }

    registerRoutes(){
        this.app.get('/status', (req,res) => {
            res.json({
                status: 'UP',
                version: pkg.version,
                node: process.version,
                resource: process.cpuUsage().system,
                uptime_min: Math.floor(process.uptime() / 60)
            })
        })
        
        this.routes.forEach(route => {
            let instanceOfRoute = new route();
            instanceOfRoute.useRoute(this.app);
        })

        return this.app;
    }
}