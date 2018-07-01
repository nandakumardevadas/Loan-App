var path = require('path');
var controller = require('../Controllers/index');

class Router {

    constructor(app, expressRouter) {
        this.expressRouter = expressRouter;
        this.app = app;
        this.dashboardController = controller.dashboard;
        this.payeeController = controller.payee;
        this.dueController = controller.due;
        this.settlementController = controller.settlement;
        this.init = this.initRouting(app, expressRouter);
    }

    initRouting(app, expressRouter) {
        expressRouter.get('/dashboard', this.bindParams(this.dashboardController.Dashboard))
        expressRouter.get('/payees', this.bindParams(this.payeeController.listAll))
        expressRouter.post('/payees', this.bindParams(this.payeeController.create))
        expressRouter.post('/payees/:payeeId/dues', this.bindParams(this.dueController.create))
        expressRouter.get('/payees/:payeeId/dues', this.bindParams(this.dueController.listAll))
        expressRouter.post('/payees/:payeeId/dues/:dueId/settlements', this.bindParams(this.settlementController.create))
        expressRouter.get('/payees/:payeeId/dues/:dueId/settlements', this.bindParams(this.settlementController.listAll))
        expressRouter.get("/", function (req, res) {
            res.sendFile(path.resolve('index.html'));
        });
        return expressRouter;
    }
    
    static bootstrap(app, expressRouter) {
        return new Router(app, expressRouter);
    }

    bindParams(params) {
        return params.bind(params)
    }
}

module.exports = Router;