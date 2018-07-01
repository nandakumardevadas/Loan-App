const payeeService = require('../Services/payee');

class PayeeController {
    get create() {
        return payeeService.add();
    }

    get listAll() {
        return payeeService.list();
    }
}

module.exports = new PayeeController();