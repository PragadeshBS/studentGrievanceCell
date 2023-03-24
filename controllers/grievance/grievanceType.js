const GrievanceType = require("../../models/GrievanceType");

// development only
const addGrievanceType = async (req, res) => {
  const { name, description } = req.body;
  const newGrievanceType = await GrievanceType.create({
    name,
    description,
  });
  res.status(201).json({
    status: "success",
    data: {
      newGrievanceType,
    },
  });
};

module.exports = {
  addGrievanceType,
};
