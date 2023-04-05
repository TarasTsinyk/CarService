const { Router } = require('express')
const Maintenance = require('../models/Maintenance')
const MaintenanceDetails = require('../models/MaintenanceDetails')
const auth = require('../middleware/auth.middleware')
const config = require('config')
const shortid = require('shortid')
const router = Router()
const Vehicle = require('../models/Vehicle')
//className
router.post('/create_update', auth, async (req, res) => {
    try {
        const { form, tblRows } = req.body
        form.owner = req.user.userId
        delete form.engine
        delete form.vin
        delete form.vehiclename
        const Ob = await Maintenance.findOne({ docnum: form.docnum, owner: form.owner })
        if (Ob) {
            Ob.carmileage = form.carmileage;
            Ob.docdate = form.docdate;
            Ob.vehicleID = form.vehicleID
            await Ob.save()
            await MaintenanceDetails.deleteMany({ owner: Ob._id })
        }
        else {
            const Ob = new Maintenance(form)
            await Ob.save()
        }
        const ownerDoc = Ob._id
        tblRows.forEach(async (el) => {
            el.owner = ownerDoc
            const docDetail = new MaintenanceDetails(el)
            await docDetail.save()
        })
        return res.json({ message: 'document save!!!' })

    } catch (error) {
        res.status(500).json({ message: 'Something wrong2,try again !!!' })
    }
})

router.get('/', auth, async (req, res) => {
    try {
        const documents = await Maintenance.find({ owner: req.user.userId }).exec() //?????
        res.json({ documents })
    } catch (error) {
        res.status(500).json({ message: 'Something wrong,try again !!!' })
    }
})

router.get('/report/:vid', auth, async (req, res) => {
    try {
        const vehicleID = req.params.vid
        const documents = await Maintenance.find({ owner: req.user.userId, vehicleID }).sort({ 'docnum': 1 }).exec() //?????
        const { datefrom, dateto } = req.headers
        const docsDetails = []
        for (i = 0; i < documents.length; i++) {
            const { _id: owner, docnum, docdate, carmileage } = documents[i]
            const docDetails = await MaintenanceDetails.find({ owner: owner })
            if (docDetails) {
                docDetails.forEach(element => {
                    const docDetail = {}
                    docDetail.docnum = docnum
                    docDetail.docdate = docdate
                    docDetail.carmileage = carmileage
                    docDetail.price = element.price
                    docDetail.workprice = element.workprice
                    docDetail.work = element.work
                    docDetail.part = element.part
                    docsDetails.push(docDetail)
                });
            }
        }

        res.json({ documents, docsDetails })
    } catch (error) {
        res.status(500).json({ message: 'Something wrong,try again !!!' })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const docId = req.params.id
        const Ob = await Maintenance.findById(docId)
        const ownerDoc = Ob._id
        const tblRows = await MaintenanceDetails.find({ owner: ownerDoc })
        const vehicle = await Vehicle.findById(Ob.vehicleID)
        const { number, desc, vin, engine, name } = vehicle
        const T = tblRows.map((el, ind) => {
            const { work, part, price, workprice } = el
            return { work, part, price, workprice, id: ind }
        })
        const form = { ...Ob._doc, vehiclenumber: number, vin, engine, vehiclename: name }
        const data = { form, tblRows: T }
        res.json(data)
    } catch (error) {
        res.status(500).json({ message: 'Something wrong,try again !!!' })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const docId = req.params.id

        const doc = await Maintenance.findById(docId)
        const ownerDoc = doc._id
        MaintenanceDetails.deleteMany({ owner: ownerDoc })
        doc.delete()
        res.json({ docId, ok: true })
    } catch (error) {
        res.status(500).json({ message: 'Something wrong,try again !!!' })
    }
})
module.exports = router