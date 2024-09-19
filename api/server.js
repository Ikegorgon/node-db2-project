const express = require("express")

const server = express()
const router = require('./cars/cars-router')
// DO YOUR MAGIC
server.use(express.json());
server.use('/api/cars', router);

server.use('*', (req, res) => {
    res.status(404).json({ message: "Error 404: Page Not Found." })
})

module.exports = server
