const MongoDB = require('../Models/db');

class BaseService extends MongoDB {
    constructor() {
        super();
    }
}

module.exports = BaseService;