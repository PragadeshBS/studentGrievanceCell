const Grievance = require("../../models/Grievance");
const Student = require("../../models/Student");
const Staff = require("../../models/Staff");

// create a new grievance
const addGrievance = async (req, res) => {
  const { title, description, studentRegisterNo, staffId } = req.body;
  const student = await Student.findOne({ registerNo: studentRegisterNo });
  const staff = await Staff.findOne({ staffId });
  const grievance = await Grievance.create({
    title,
    description,
    student,
    staffAssigned: staff,
  });
  res.json({ grievance });
};

// get list of grievances
const getGrievances = async (req, res) => {
  const grievances = await Grievance.find();
  res.json({ grievances });
};

module.exports = {
  addGrievance,
  getGrievances,
};
