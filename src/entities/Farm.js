module.exports = class Farm {
  constructor(name, distance, farmerId) {
    this.name = name;
    this.distance = distance;
    this.farmer_id = farmerId;
    this.milk_production = [];
  }
};

