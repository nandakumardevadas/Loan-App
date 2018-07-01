const mongoose = require('mongoose');
const { Schema } = mongoose;

const payeeSchema = new Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, unique: true },
  mobile: { type: String, unique: true },
  dues: [{
    title: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, required: true, default: Date.now },
    mode: { type: String, required: true, enum: ['BANK' ,'CASH', 'CHEQUE'], default: 'BANK' },
    notes: { type: String },
    settlements: [{
        title: { type: String, required: true },
        amount: { type: Number, required: true },
        date: { type: Date, required: true, default: Date.now },
        mode: { type: String, required: true, enum: ['BANK' ,'CASH', 'CHEQUE'], default: 'BANK' },
        notes: { type: String }
    }]
  }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

const Payee = mongoose.model('Payee', payeeSchema);
module.exports = Payee;
