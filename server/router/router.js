const express = require('express')
const service = require('../services/index')
const MethodFun = require('../controllers/index')

const route = express.Router()

route.get('/', service.HomeRoute)
route.get('/add-user', service.addRoute)
route.get('/update-user', service.updateRoute)


route.post('/api/user', MethodFun.create)
route.get('/api/user', MethodFun.find)
route.put('/api/user/:id', MethodFun.update)
route.delete('/api/user/:id', MethodFun.delete)

module.exports = route;