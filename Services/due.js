const BaseService = require('../Services/index');
const PayeeModel = require('../Models/payee');
const dueTransformer = require('../Transformers/due');

class DueService extends BaseService {
    constructor() {
        super();
        this.PayeeModel = PayeeModel;
        this.dueTransformer = dueTransformer;
    }

    add() {
        let self = this;
        let returnMethod = function(req, res, next) {
            let requestBody = req.body;
            let payeeId = req.params.payeeId;
            self.PayeeModel.findOneAndUpdate(
                { _id: payeeId }, 
                { $push: { 'dues': requestBody } },
                function(err, success) {
                if(err)  return next(err);
                res.send({
                    code: 1000,
                    message: 'New dues added Succesfully'
                });
             });
        }
        return returnMethod;
    }

    list() {
        let self = this;
        let returnMethod = function(req, res, next) {
            let payeeId = req.params.payeeId;
            PayeeModel.findById(payeeId, '_id name dues', function(err, data) {
                if(err)  return next(err);
                let transformedData = self.dueTransformer.transformList(data);
                res.send(transformedData);
            });
        }
        return returnMethod;
    }
}

module.exports = new DueService();