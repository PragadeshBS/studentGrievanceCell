const { addGrievance } = require("../controllers/grievance/grievance");
const { getGrievanceTypes } = require("../controllers/grievance/grievanceType");
const protect = require("../middleware/auth");

const router = require("express").Router();

router.post("/", protect, addGrievance);

router.get("/types", getGrievanceTypes);

module.exports = router;
