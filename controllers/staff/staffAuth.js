const Staff = require("../../models/Staff");

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

module.exports = {
  login,
};
