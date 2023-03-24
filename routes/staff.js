const router = require("express").Router();
const { login, register } = require("../controllers/staff/staffAuth");
const { getStaff } = require("../controllers/staff/staff");

// Get staff details
router.get("/", getStaff);

router.post("/login", login);

router.post("/register", register);

module.exports = router;
