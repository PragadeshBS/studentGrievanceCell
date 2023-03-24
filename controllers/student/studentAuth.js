const Student = require("../../models/Student");
const hashPassword = require("../../utils/hashPassword");

const login = async (req, res) => {
  const { registerNo, password } = req.body;
  try {
    const student = await Student.findOne({ registerNo });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    if (student.password !== password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    return res.json({ student });
  } catch (err) {
    console.log(err);
  }
};

const register = async (req, res) => {
  try {
    const { registerNo, password, name, email, department, phone } = req.body;
    const hasedPassword = await hashPassword(password);
    const student = await Student.create({
      name,
      email,
      phone,
      registerNo,
      department,
      password: hasedPassword,
    });
    res.status(201).json({
      success: true,
      message: "Student registered successfully",
      data: {
        student,
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
  login,
  register,
};
