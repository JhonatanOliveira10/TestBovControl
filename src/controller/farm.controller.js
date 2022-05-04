const FarmService = require("../service/farm.service")


module.exports.createFarm = async (req, res) => {
  try {
    const result = await FarmService.createFarm(req.body);

    if (result.includes("ERROR")) {
      return res.status(422).json({
        message: result.replace("ERROR: ", ""),
      });
    }

    return res.status(200).json({
      message: "Data returned successfully",
      data: result,
    });
  } catch (err) {
    console.log("ERRO", err);
  }
};

module.exports.updateMilkProduction = async (req, res) => {
  try {
    const result = await FarmService.updateMilkProduction(req.body.amount_milk, req.body.date, req.params.farmId);

    if (result.includes("ERROR")) {
      return res.status(422).json({
        message: result.replace("ERROR: ", ""),
      });
    }

    return res.status(200).json({
      message: "Data returned successfully",
      data: result,
    });
  } catch (err) {
    console.log("ERRO", err);
  }
};

module.exports.productionMilkForMonth = async (req, res) => {
  try {
    const result = await FarmService.productionMilkForMonth(req.params.farmId, req.params.month);

    return res.status(200).json({
      message: "Data returned successfully",
      data: result,
    });
  } catch (err) {
    console.log("ERRO", err);
  }
};


module.exports.pricePerLiter = async (req, res) => {
  try {
    const result = await FarmService.pricePerLiter(req.params.code, req.params.month);

    return res.status(200).json({
      message: "Data returned successfully",
      data: result,
    });
  } catch (err) {
    console.log("ERRO", err);
  }
};

module.exports.pricePerLiterPerYear = async (req, res) => {
  try {
    const result = await FarmService.pricePerLiterPerYear(req.params.code, req.params.year);

    return res.status(200).json({
      message: "Data returned successfully",
      data: result,
    });
  } catch (err) {
    console.log("ERRO", err);
  }
};


