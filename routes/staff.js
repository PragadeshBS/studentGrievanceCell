const router = require("express").Router();
const { getStaffs, getStaffProfile } = require("../controllers/staff/staff");
const { login, register } = require("../controllers/staff/staffAuth");
const protect = require("../middleware/auth");

router.post("/login", login);

router.post("/register", register);

// get staffs from any of the chosen departments
router.get("/department/:departmentId", getStaffs);

router.get("/profile", protect, getStaffProfile);

module.exports = router;
