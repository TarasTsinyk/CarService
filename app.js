const express = require("express")
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const config = require('config')


const PORT = config.get('port')
const mongoUrl = config.get('mongoUrl')

//app.use(express.urlencoded({ extended: true }))
app.use(express.json({ extended: true }))
app.use("/api/auth", require('./routes/auth.routes'));

app.use("/api/vehicle", require('./routes/vehicle.routes'));
app.use("/api/maintenance", require('./routes/maintenance.routes'));

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'client', 'build')))
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

async function start() {
  try {
    await mongoose.connect(
      mongoUrl
    )
    app.listen(PORT, () => {
      console.log(`server has been stared on port ... ${PORT}`)
    })
  } catch (e) {
    process.exit(1)
  }
}

start()