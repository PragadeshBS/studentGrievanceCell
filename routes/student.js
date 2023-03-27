const router = require("express").Router();
const protect = require("../middleware/auth");
const { login, register } = require("../controllers/student/studentAuth");
const { getStudentProfile } = require("../controllers/student/student");

router.post("/login", login);

router.post("/register", register);

router.get("/profile", protect, getStudentProfile);

module.exports = router;
