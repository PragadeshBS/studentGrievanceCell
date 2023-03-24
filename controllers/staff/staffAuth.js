const Staff = require("../../models/Staff");
const { hashPassword } = require("../../utils/hashPassword");

const login = async (req, res) => {
  const { staffId, password } = req.body;
  console.log(staffId, password);
  try {
    const staff = await Staff.findOne({ staffId });
    if (!staff) {
      return res.status(404).json({ message: "Staff not found" });
    }
    if (staff.password !== password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    return res.json({ staff });
  } catch (err) {
    console.log(err);
  }
};

const register = async (req, res) => {
  try {
    const { staffId, password, name, email, department, phone, designation } =
      req.body;
    const hasedPassword = await hashPassword(password);
    const staff = await Student.create({
      name,
      email,
      phone,
      staffId,
      department,
      password: hasedPassword,
      designation,
    });
    res.status(201).json({
      success: true,
      message: "Staff registered successfully",
      data: {
        staff,
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
