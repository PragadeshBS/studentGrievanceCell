const Student = require("../../models/Student");
const createToken = require("../../utils/createToken");
const { hashPassword, verifyPassword } = require("../../utils/hashPassword");

const login = async (req, res) => {
  const { registerNo, password } = req.body;
  try {
    const student = await Student.findOne({ registerNo });
    if (!student) {
      return res.status(400).json({
        success: false,
        message: "Student not found",
      });
    }
    const isPasswordCorrect = await verifyPassword(password, student.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }
    res.cookie(
      "token",
      await createToken({ userId: student.id, userType: "Student" }),
      {
        maxAge: 1000 * 60 * 60 * 24 * 14,
        httpOnly: true,
        sameSite: "strict",
      }
    );
    return res.json({
      success: true,
      message: "Student logged in successfully",
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
    res.cookie(
      "token",
      await createToken({ userId: student.id, userType: "Student" }),
      {
        maxAge: 1000 * 60 * 60 * 24 * 14,
        httpOnly: true,
        sameSite: "strict",
      }
    );
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
