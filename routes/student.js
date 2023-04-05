const router = require("express").Router();
const protect = require("../middleware/auth");
const { login, register } = require("../controllers/student/studentAuth");
const { getStudentProfile } = require("../controllers/student/student");
const { protectStudent } = require("../middleware/checkUserRole");

router.post("/login", login);

router.post("/register", register);

router.get("/profile", protect, protectStudent, getStudentProfile);

module.exports = router;
