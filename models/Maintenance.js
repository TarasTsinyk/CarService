
const { Schema, model, Types } = require('mongoose')
const schema = new Schema({
    docdate: { type: Date, default: Date.now },
    docnum: { type: Number, default: 0 },
    vehiclename: { type: String },
    // vin: { type: String },
    // engine: { type: String },
    carmileage: { type: Number },
    owner: { type: Types.ObjectId, ref: 'User' },
    vehicleID: { type: Types.ObjectId, ref: 'Vehicle' }
})

module.exports = model('Maintenance', schema)