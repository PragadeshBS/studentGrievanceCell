const router = require("express").Router();
const { getStudent } = require("../controllers/student/student");
const { login, register } = require("../controllers/student/studentAuth");

// Get staff details
router.get("/", getStudent);

router.post("/login", login);

router.post("/register", register);

module.exports = router;
