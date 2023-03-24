const Department = require("../../models/Department");

// development only
const addDepartment = async (req, res) => {
  const { name } = req.body;
  const newDepartment = await Department.create({
    name,
  });
  res.status(201).json({
    status: "success",
    data: {
      newDepartment,
    },
  });
};

const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    res.status(200).json({
      success: true,
      message: "Departments fetched successfully",
      data: {
        departments,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      succes: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  addDepartment,
  getDepartments,
};
