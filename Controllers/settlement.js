const settlementService = require('../Services/settlement');

class SettlementController {
    get create() {
        return settlementService.add();
    }

    get listAll() {
        return settlementService.list();
    }
}

module.exports = new SettlementController();