const router = require("express").Router();
const { getDepartments } = require("../controllers/department/department");

router.get("/", getDepartments);

module.exports = router;
