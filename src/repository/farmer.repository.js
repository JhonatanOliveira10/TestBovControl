const { ObjectId } = require('mongodb')

const createFarmer = async (farmer) => {
  return await global.connection.collection("farmer").insertOne(farmer);
};

const findFarmerByEmail = async (email) => {
  return await global.connection.collection("farmer").findOne({ email: email });
};

const findFarmerByCPF = async (cpf) => {
  return await global.connection.collection("farmer").findOne({ cpf: cpf });
};

const findFarmerByCode = async (code) => {
  return await global.connection.collection("farmer").findOne({ code: parseInt(code) });
};

const findFarmerById = async (_id) => {
    return await global.connection.collection("farmer").findOne({ _id: ObjectId(`${_id}`)  });
}

module.exports = {
  createFarmer,
  findFarmerByEmail,
  findFarmerByCPF,
  findFarmerByCode,
  findFarmerById
};
