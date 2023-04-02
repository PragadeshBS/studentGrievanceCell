const Grievance = require("../../models/Grievance");
const AnonymousGrievance = require("../../models/AnonymousGrievance");

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
      grievance,
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
      .populate("grievanceStatus", "title")
      .populate("grievanceType", "name")
      .populate("staffAssigned", ["name", "designation"])
      .populate("student", ["name", "registerNo"]);
    res.status(200).json({
      success: true,
      message: "Grievances fetched successfully",
      grievances,
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
      .populate("grievanceStatus", "title")
      .populate("grievanceType", "name")
      .populate("staffAssigned", ["name", "designation"])
      .populate("student", ["name", "registerNo"]);
    res.status(200).json({
      success: true,
      message: "Grievances fetched successfully",
      grievances,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// get all anonymous grievances assigned to a staff
const getAssignedAnonymousGrievances = async (req, res) => {
  try {
    const grievances = await AnonymousGrievance.find({
      staffAssigned: req.user.userInfo._id,
    })
      .populate("grievanceStatus", "title")
      .populate("grievanceType", "name")
      .populate("staffAssigned", ["name", "designation"]);
    res.status(200).json({
      success: true,
      message: "Grievances fetched successfully",
      grievances,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// get details of a grievance
const getGrievance = async (req, res) => {
  try {
    const grievanceId = req.params.grievanceId;
    const grievance = await Grievance.findOne({
      _id: grievanceId,
    })
      .populate("grievanceType", "name")
      .populate("grievanceStatus", "title")
      .populate("student", ["name", "registerNo"])
      .populate("staffAssigned", ["name", "designation"]);
    if (!grievance) {
      return res.status(404).json({
        success: false,
        message: "Grievance not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Grievance fetched successfully",
      grievance,
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
  getAssignedAnonymousGrievances,
  getGrievance,
};
