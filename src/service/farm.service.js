const FarmRepository = require("../repository/farm.repository")
const FarmerRepository = require("../repository/farmer.repository")
var currencyFormatter = require('currency-formatter');
const Farm = require("../entities/Farm")


const createFarm = async (farm) => {
    const resultValidate = await validateCreateFarm(farm)
    if(resultValidate !== '') {
        return resultValidate
    }

    const farmDb = new Farm(farm.name, farm.distance, farm.farmer_id)
    const resulDb = await FarmRepository.createFarm(farmDb)
    return resulDb.insertedId.toString()
}

const updateMilkProduction = async (amountMilk, date, farmId) => {
    const resultValidate = await validateMilkProduction(farmId, amountMilk, date)
    if(resultValidate !== '') {
        return resultValidate
    }


    const farm = await FarmRepository.findFarmById(farmId)
    farm.milk_production.push({
        amount_milk: amountMilk,
        date: date,
        year: parseInt(date.slice(0, 4)),
        mounth: parseInt(date.slice(5,7)),
        day: parseInt(date.slice(8,10))
    })
    const resulDb = await FarmRepository.updateMilkProduction(farmId, farm.milk_production)
    return resulDb.modifiedCount.toString()
}

const productionMilkForMonth = async (farmId, month) => {
    const arrayResult = []
    const farm = await FarmRepository.findFarmById(farmId)
    const resultMilkForDay = farm.milk_production.filter(production => production.mounth === parseInt(month))
    const total = resultMilkForDay.reduce((total, production) => { return total + production.amount_milk }, 0);

    resultMilkForDay.map(production => {
        arrayResult.push({
            production_per_day: `${production.amount_milk} L`,
            date: production.date 
        })
    })

    const result = {
        monthly_average:  `${total / 30} L`,
        arrayResult
    }

    return  result
}


const pricePerLiter = async (code, month) => {
    let resultPrice = 0
    const farmer = await FarmerRepository.findFarmerByCode(code)
    const farm = await FarmRepository.findFarmByFarmerId(farmer._id.toString())

    const resultMilkForMonth = farm.milk_production.filter(production => production.mounth === parseInt(month))
    const total = resultMilkForMonth.reduce((total, production) => { return total + production.amount_milk }, 0);

    resultPrice = resultPriceMilk(month, farm, resultPrice, total);

    return {
        price_per_liter_eua: currencyFormatter.format(resultPrice / total, { code: 'USD' }),
        price_per_liter_pt_br: `R$${currencyFormatter.format(resultPrice / total, { code: 'pt-BR' }).replace(".", ",")}`
    }
}

const pricePerLiterPerYear = async (code, year) => {
    const farmer = await FarmerRepository.findFarmerByCode(code)
    const farm = await FarmRepository.findFarmByFarmerId(farmer._id.toString())

    const resultMilkForYear = farm.milk_production.filter(production => production.year === parseInt(year))

    const arrayResult = []
    for (let month = 1; month < 12; month++) {
        let resultPrice = 0
        const arrayMonth = resultMilkForYear.filter(x => x.mounth === month)
        if(arrayMonth.length > 0) {
            const total = arrayMonth.reduce((total, production) => { return total + production.amount_milk }, 0);
            const result = resultPriceMilk(month, farm, resultPrice, total)
            arrayResult.push({
                month: month,
                price_per_liter_eu: currencyFormatter.format(result / total, { code: 'USD' }),
                price_per_liter_pt_br:`R$${currencyFormatter.format(result / total, { code: 'pt-BR' }).replace(".", ",")}`
            })
        }
    }

    return arrayResult
}


function resultPriceMilk(month, farm, resultPrice, total) {
    if (parseInt(month) < 6) {

        if (farm.distance < 50) {
            resultPrice = (total * 1.80) - (0.05 * farm.distance);
        } else {
            resultPrice = (total * 1.80) - (0.06 * farm.distance);
        }

    } else {

        if (total > 10000) {
            resultPrice = (total * 1.95) + (0, 01 * total);
        } else {
            resultPrice = (total * 1.95);
        }
    }
    return resultPrice;
}



const validateMilkProduction  = async (farmId, amountMilk, date) => {
    const resultFarm = await FarmRepository.findFarmById(farmId)
    if(resultFarm === null) {
        return "ERROR: Farm not found"
    }
    if(amountMilk < 0) {
        return "ERROR: The amount of milk cannot be negative"
    }

    if(resultFarm.milk_production.some(production => production.date === date)) {
        return "ERROR: There is already a production registered for that day"
    }

    return ''
}

const validateCreateFarm = async (farm) => {
    if(farm.name === "") {
        return "ERROR: Name is required"
    }
    
    if(typeof farm.name !== "string") {
        return "ERROR: Name invalid"
    }

    if(farm.farmer_id === "") {
        return "ERROR: Farmer is required"
    }

    if(farm.distance < 0) {
        return "ERROR: The distance from the farm to the factory cannot be negative"
    }

    const resultFarmer = await FarmerRepository.findFarmerById(farm.farmer_id)
    if(resultFarmer === null) {
        return "ERROR: Farmer not found"
    }

    const resultFarm = await FarmRepository.findFarmByFarmerId(farm.farmer_id)
    if(resultFarm !== null) {
        return "ERROR: There is already a farm registered for this farmer"
    }
    
    return ''
}

module.exports = {
    createFarm,
    updateMilkProduction,
    productionMilkForMonth,
    pricePerLiter,
    pricePerLiterPerYear
}