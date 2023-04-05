const { Router } = require('express')
const router = Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')
const { check, validationResult, body } = require('express-validator')
const config = require('config')
const jwt = require("jsonwebtoken")

//api/auth/register
router.post('/register',
    [
        check('email', 'wrong email').isEmail(),
        check('password', 'minimal lengh 6 ').isLength({ min: 6 })
    ], async (req, res) => {
        try {
            const errors = validationResult(req)
            const { email, password } = req.body
            const candidate = await User.findOne({ email })
            console.log('body', req.body)
            if (candidate) {
                return res.status(400).json({ message: 'user already exist' })
            }

            const hashPassword = await bcrypt.hash(password, 12)
            const user = new User({ email, password: hashPassword })
            await user.save()
            res.status(201).json({ message: 'user have been added' })
        } catch (error) {
            res.status(500).json({ message: 'Something wrong,try again !!!' })
        }
    })

//api/auth/login
router.post('/login', [
    check('email', 'wrong email').isEmail(),
    check('password', 'wrong password ').exists()
], async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'incorrect data login'
            })
        }
        const { email, password } = req.body
        console.log(email)
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: 'user dont found' })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ message: 'incorrect password' })
        }
        const token = jwt.sign(
            { userId: user.id },
            config.get('jwtSecret'),
            { expiresIn: '1h' })
        res.json({ token, userId: user.id })

    } catch (error) {

    }
})
router.get('/', (reg, res) => {
    return res.status(200).json({ message: 'server working' })
})
module.exports = router