const FarmerRepository = require('../repository/farmer.repository')
const { cpf } = require('cpf-cnpj-validator')
const emailValidation = require('nodejs-email-validation')
const Farmer = require('../entities/Farmer')

const createFarmer = async (farmer) => {
    const resultValidate = await validateCreateFarmer(farmer)
    if(resultValidate !== '') {
        return resultValidate
    }

    const farmerDb = new Farmer(farmer.name, farmer.email, farmer.cpf)
    const resulDb = await FarmerRepository.createFarmer(farmerDb)
    return resulDb.insertedId.toString()
}

const findFarmerByCode = async (code) => {
    return await FarmerRepository.findFarmerByCode(code)
}

const validateCreateFarmer = async (farmer) => {
    if (farmer.cpf === "" || cpf.isValid(farmer.cpf) === false) {
        return "ERROR: CPF invalid"
    }

    if (farmer.email === "" || emailValidation.validate(farmer.email) === false) {
        return "ERROR: Email invalid"
    }

    
    if(farmer.name === "") {
        return "ERROR: Name is required"
    }
    
    if(typeof farmer.name !== "string") {
        return "ERROR: Name invalid"
    }

    const resultFarmerByEmail = await FarmerRepository.findFarmerByEmail(farmer.email)
    if(resultFarmerByEmail !== null) {
        return "ERROR: There is already a farmer with this email"
    }

    const resultFarmerByCpf = await FarmerRepository.findFarmerByCPF(farmer.cpf)
    if(resultFarmerByCpf !== null) {
        return "ERROR: There is already a farmer with this cpf"
    }

    return ''
}

module.exports = {
    createFarmer,
    findFarmerByCode
}