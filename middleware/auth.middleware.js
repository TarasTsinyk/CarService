
const jwt = require("jsonwebtoken")
const config = require('config')

module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next()
    }

    try {
        
        console.log(req.headers)
        const token = req.headers.authorization.split(' ')[1] //Bearer TOKEN
        console.log('Bearer TOKEN' , token)
        if (!token) {
            return res.status(401).json({ message: 'wrong token' })
        }
        const decoded = jwt.verify(token, config.get('jwtSecret'))
        req.user = decoded
        next()
    } catch (error) {
        return res.status(401).json({ message: 'wrong token' })
    }
}