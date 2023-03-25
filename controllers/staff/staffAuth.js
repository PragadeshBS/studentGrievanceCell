const Staff = require("../../models/Staff");
const { hashPassword, verifyPassword } = require("../../utils/hashPassword");
const { createToken } = require("../../utils/userToken");

const login = async (req, res) => {
  const { staffId, password } = req.body;
  try {
    const staff = await Staff.findOne({ staffId });
    if (!staff) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }
    const isPasswordCorrect = await verifyPassword(password, staff.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }
    res.cookie(
      "token",
      await createToken({ userId: staff.id, userType: "staff" }),
      {
        maxAge: 1000 * 60 * 60 * 24 * 14,
        httpOnly: true,
        sameSite: "strict",
      }
    );
    // remove password from response
    staff.password = undefined;
    return res.status(200).json({
      success: true,
      message: "Staff logged in successfully",
      data: staff,
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
    const { staffId, password, name, email, department, phone, designation } =
      req.body;
    const hasedPassword = await hashPassword(password);
    const staff = await Staff.create({
      name,
      email,
      phone,
      staffId,
      department,
      password: hasedPassword,
      designation,
    });
    res.cookie(
      "token",
      await createToken({ userId: staff.id, userType: "staff" }),
      {
        maxAge: 1000 * 60 * 60 * 24 * 14,
        httpOnly: true,
        sameSite: "strict",
      }
    );
    // remove password from response
    staff.password = undefined;
    return res.status(201).json({
      success: true,
      message: "Staff registered successfully",
      data: staff,
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
