const router = require("express").Router();
const { login, register } = require("../controllers/student/studentAuth");

router.post("/login", login);

router.post("/register", register);

module.exports = router;
