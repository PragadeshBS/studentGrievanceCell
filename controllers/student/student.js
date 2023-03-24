const mongoose = require("mongoose");
const Student = require("../../models/Student");

const getStudent = async (req, res) => {
  const registerNo = req.query.registerNo;
  try {
    const student = await Student.find({ registerNo });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    return res.json({ student });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getStudent,
};
