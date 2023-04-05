const Staff = require("../../models/Staff");

// get all staffs from a department
const getStaffsFromDepartment = async (req, res) => {
  try {
    const staffs = await Staff.find({ department: req.params.deptId });
    return res.status(200).json({
      success: true,
      message: "Staffs fetched successfully",
      staffs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// get a single staff by id
const getStaffById = async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.staffId).select([
      "-password",
      "-createdAt",
      "-updatedAt",
    ]);
    return res.status(200).json({
      success: true,
      message: "Staff fetched successfully",
      staff,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getStaffsFromDepartment,
  getStaffById,
};
