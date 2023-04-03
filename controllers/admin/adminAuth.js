const Admin = require("../../models/Admin");
const { verifyPassword } = require("../../utils/hashPassword");
const { createToken } = require("../../utils/userToken");

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }
    const isPasswordCorrect = await verifyPassword(password, admin.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }
    res.cookie("token", createToken({ userId: admin.id, userType: "admin" }), {
      maxAge: 1000 * 60 * 60 * 24 * 14,
      httpOnly: true,
      sameSite: "strict",
    });
    // remove password from response
    admin.password = undefined;
    return res.status(200).json({
      success: true,
      message: "Admin logged in successfully",
      admin,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = { adminLogin };
