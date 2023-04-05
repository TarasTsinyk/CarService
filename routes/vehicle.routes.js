const { Router } = require('express')
const Vehicle = require('../models/Vehicle')
const auth = require('../middleware/auth.middleware')
const config = require('config')
const shortid = require('shortid')
const router = Router()
//className
router.post('/add', auth, async (req, res) => {
    try {
        const { name, number, vin, engine, date, color, desc } = req.body
        const existing = await Vehicle.findOne({ owner: req.user.userId, number })
        if (existing) {
            return res.status(200).json({ vehicle: existing })
        }
        const vhcl = new Vehicle({ name, number, vin, desc, engine, date, color, owner: req.user.userId })
        await vhcl.save()
        res.status(201).json({ vehicle: vhcl })
    } catch (error) {
        res.status(500).json({ message: 'Something wrong2,try again !!!' })
    }
})

router.get('/', auth, async (req, res) => {
    try {
        const vehicles = await Vehicle.find({ owner: req.user.userId }) //?????
        res.json(vehicles)
    } catch (error) {
        res.status(500).json({ message: 'Something wrong,try again !!!' })
    }
})
router.get('/:id', async (req, res) => {
    try {
        const vehicleId = req.params.id
        console.log('vehicleId', vehicleId)
        const vehicle = await Vehicle.findById(vehicleId)
        res.json(vehicle)
    } catch (error) {
        res.status(500).json({ message: 'Something wrong,try again !!!' })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const vehicleId = req.params.id
        const vehicle = await Vehicle.findById(vehicleId)
        vehicle.delete()
        res.json({ vehicleId, ok: true })
    } catch (error) {
        res.status(500).json({ message: 'Something wrong,try again !!!' })
    }
})

module.exports = router