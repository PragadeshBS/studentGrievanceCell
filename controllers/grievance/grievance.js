const Grievance = require("../../models/Grievance");
const Student = require("../../models/Student");
const Staff = require("../../models/Staff");

// create a new grievance
const addGrievance = async (req, res) => {
  try {
    const { title, description, grievanceType, staffAssigned } = req.body;
    const grievance = await Grievance.create({
      title,
      description,
      grievanceType,
      student: req.user.userInfo._id,
      staffAssigned,
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

// get all grievances raised by a student
const getStudentGrievances = async (req, res) => {
  try {
    const grievances = await Grievance.find({
      student: req.user.userInfo._id,
    })
      .populate("grievanceType", "name")
      .populate("grievanceStatus", "title")
      .populate("staffAssigned", ["name", "designation"]);
    res.status(200).json({
      success: true,
      message: "Grievances fetched successfully",
      data: {
        grievances,
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

// get all grievances assigned to a staff
const getStaffGrievances = async (req, res) => {
  try {
    const grievances = await Grievance.find({
      staffAssigned: req.user.userInfo._id,
    })
      .populate("grievanceType", "name")
      .populate("grievanceStatus", "title")
      .populate("student", ["name", "registerNo"]);
    res.status(200).json({
      success: true,
      message: "Grievances fetched successfully",
      data: {
        grievances,
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
  getStudentGrievances,
  getStaffGrievances,
};
