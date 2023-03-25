const Staff = require("../../models/Staff");

// get list of staffs from the student's department
const getStaffs = async (req, res) => {
  try {
    const { department: departmentId } = req.user.userInfo;
    const staffs = await Staff.find({ department: departmentId });
    res.status(200).json({
      success: true,
      message: "List of staffs",
      data: {
        staffs,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  getStaffs,
};
