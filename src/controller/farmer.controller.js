const FarmerService = require("../service/farmer.service");

module.exports.createFarmer = async (req, res) => {
  try {
    const result = await FarmerService.createFarmer(req.body);

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


module.exports.findFarmerByCode = async (req, res) => {
    try {
      const result = await FarmerService.findFarmerByCode(req.params.code);
  
      return res.status(200).json({
        message: "Data returned successfully",
        data: result,
      });
    } catch (err) {
      console.log("ERRO", err);
    }
  };
  
