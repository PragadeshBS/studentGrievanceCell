const Student = require("../../models/Student");

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

module.exports = {
  login,
};
