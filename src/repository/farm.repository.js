const { ObjectId } = require('mongodb')

const createFarm = async (farm) => {
  return await global.connection.collection("farm").insertOne(farm);
};

const findFarmByFarmerId = async (farmerId) => {
  return await global.connection.collection("farm").findOne({ farmer_id: farmerId });
};

const findFarmById = async (_id) => {
  return await global.connection.collection("farm").findOne({ _id: ObjectId(`${_id}`)  });
}

const updateMilkProduction = async (_id, production) => {
  return await global.connection.collection("farm").updateOne({_id: ObjectId(`${_id}`)}, {
    $set: { milk_production: production }
  })
}


module.exports = {
  createFarm,
  findFarmByFarmerId,
  findFarmById,
  updateMilkProduction
};
