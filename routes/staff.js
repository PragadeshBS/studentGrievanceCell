const router = require("express").Router();
const { getStaffs, getStaffProfile } = require("../controllers/staff/staff");
const { login, register } = require("../controllers/staff/staffAuth");
const protect = require("../middleware/auth");
const { protectStaff } = require("../middleware/checkUserRole");

router.post("/login", login);

router.post("/register", register);

// get staffs from any of the chosen departments
router.get("/department/:departmentId", getStaffs);

router.get("/profile", protectStaff, getStaffProfile);

module.exports = router;
