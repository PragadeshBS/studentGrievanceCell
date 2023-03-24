const Grievance = require("../../models/Grievance");
const Student = require("../../models/Student");
const Staff = require("../../models/Staff");

// create a new grievance
const addGrievance = async (req, res) => {
  try {
    const { title, description, grievanceType, staffAssigned } = req.body;
    const { studentRegisterNo } = req.user.studentRegisterNo;
    const student = await Student.findOne({ registerNo: studentRegisterNo });
    const staff = await Staff.findOne({ staffAssigned });
    const grievance = await Grievance.create({
      title,
      description,
      grievanceType,
      student: student._id,
      staffAssigned: staff._id,
    });
    res.status(201).json({
      success: true,
      message: "Grievance created successfully",
      data: {
        grievance,
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
  addGrievance,
};
