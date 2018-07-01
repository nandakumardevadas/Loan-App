const BaseService = require('../Services/index');
const PayeeModel = require('../Models/payee');
const settlementTransformer = require('../Transformers/settlement');

class SettlementService extends BaseService {
    constructor() {
        super();
        this.PayeeModel = PayeeModel;
        this.settlementTransformer = settlementTransformer;
    }

    add() {
        let self = this;
        let returnMethod = function(req, res, next) {
            let requestBody = req.body;
            let payeeId = req.params.payeeId;
            let dueId = req.params.dueId;
            self.PayeeModel.findOneAndUpdate(
                { _id: payeeId, 'dues._id': dueId }, 
                { $push: { 'dues.$.settlements': requestBody } },
                function(err, success) {
                if(err)  return next(err);
                res.send({
                    code: 1000,
                    message: 'New settlement added Succesfully'
                });
             });
        }
        return returnMethod;
    }

    list() {
        let self = this;
        let returnMethod = function(req, res, next) {
            let payeeId = req.params.payeeId;
            let dueId = req.params.dueId;
            PayeeModel.find(
                { _id: payeeId, 'dues._id': dueId }, 
                '_id name dues', 
                function(err, data) {
                if(err)  return next(err);
                let transformedData = self.settlementTransformer.transformList(data);
                res.send(transformedData);
            });
        }
        return returnMethod;
    }
}

module.exports = new SettlementService();