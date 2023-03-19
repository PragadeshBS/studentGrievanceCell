import Staff from "@/models/Staff";

const getStaff = async (req, res) => {
  const staff = await Staff.find({});
  return res.status(200).json(staff);
};

const createStaff = async (req, res) => {
  const staff = await Staff.create(req.body);
  return res.status(201).json(staff);
};

module.exports = {
  getStaff,
  createStaff,
};
