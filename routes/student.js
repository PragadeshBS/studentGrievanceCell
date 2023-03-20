const router = require("express").Router();
const { getStudent } = require("../controllers/student/studentController");
const {login } = require("../controllers/student/studentAuth");

// Get staff details
router.get("/", getStudent);

router.post("/login", login);

module.exports = router;
