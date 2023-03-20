const router = require("express").Router();
const { login } = require("../controllers/staff/staffAuth");
const { getStaff } = require("../controllers/staff/staffController");

// Get staff details
router.get("/", getStaff);

router.post("/login", login);

module.exports = router;
