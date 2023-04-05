
const { Schema, model, Types } = require('mongoose')
const schema = new Schema({
    work: { type: String ,default : ''},
    part: { type: String ,default : ''},
    price: { type: String ,default : ''},
    workprice: { type: String,default : ''},
    owner: { type: Types.ObjectId, ref: 'Maintenance' }
})

module.exports = model('MaintenanceDetails', schema)