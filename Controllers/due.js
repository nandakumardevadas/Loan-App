const dueService = require('../Services/due');

class DueController {
    get create() {
        return dueService.add();
    }

    get listAll() {
        return dueService.list();
    }
}

module.exports = new DueController();