const BaseService = require('../Services/index');
const PayeeModel = require('../Models/payee');
const payeeTransformer = require('../Transformers/payee');

class PayeeService extends BaseService {
    constructor() {
        super();
        this.PayeeModel = PayeeModel;
        this.payeeTransformer = payeeTransformer;
    }

    add() {
        let self = this;
        let returnMethod = function(req, res, next) {
            let requestBody = req.body;
            let newPayee = self.PayeeModel(requestBody);
            newPayee.save(function(err) {
                if(err)  return next(err);
                res.send({
                    code: 1000,
                    message: 'Payee Created Succesfully'
                });
            });
        }
        return returnMethod;
    }

    list() {
        let self = this;
        let returnMethod = function(req, res, next) {
            let requestBody = req.body;
            PayeeModel.find({}, function(err, data) {
                if(err)  return next(err);
                let transformedData = self.payeeTransformer.transformList(data);
                res.send(transformedData);
            });
        }
        return returnMethod;
    }
}

module.exports = new PayeeService();