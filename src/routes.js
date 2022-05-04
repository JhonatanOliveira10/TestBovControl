const express = require("express")
const myApi = express.Router()
const controllerFarmer = require("../src/controller/farmer.controller")
const controllerFarm = require("../src/controller/farm.controller")

myApi.post('/farmer', controllerFarmer.createFarmer)
myApi.get('/farmer/:code', controllerFarmer.findFarmerByCode)
myApi.post('/farm', controllerFarm.createFarm)
myApi.patch('/farm/:farmId', controllerFarm.updateMilkProduction)
myApi.get('/farm/:farmId/production-milk-for-month/:month', controllerFarm.productionMilkForMonth)
myApi.get('/farm/:code/price-per-liter/:month', controllerFarm.pricePerLiter)
myApi.get('/farm/:code/price-per-liter-per-year/:year', controllerFarm.pricePerLiterPerYear)


module.exports = myApi
