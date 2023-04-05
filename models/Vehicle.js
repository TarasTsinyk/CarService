const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
    name: { type: String, required: true },
    desc: { type: String, required: true },
    number: { type: String, required: true, unique: true },
    vin: { type: String, required: true, unique: true },
    engine: { type: String },
    color: { type: String},
    owner: { type: Types.ObjectId, ref: 'User' }
})

module.exports = model('Vehicle', schema)