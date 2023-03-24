const GrievanceStatus = require("../../models/GrievanceStatus");

const addGrievanceStatus = async (req, res) => {
  const { title, description } = req.body;
  const newGrievanceStatus = await GrievanceStatus.create({
    title,
    description,
  });
  res.status(201).json({
    status: "success",
    data: {
      newGrievanceStatus,
    },
  });
};

module.exports = {
  addGrievanceStatus,
};
