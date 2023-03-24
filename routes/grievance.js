const { addGrievance } = require("../controllers/grievance/grievance");

const router = require("express").Router();

router.post("/", addGrievance);

module.exports = router;
