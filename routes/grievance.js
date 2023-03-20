const {
  addGrievance,
  getGrievances,
} = require("../controllers/grievance/grievanceController");

const router = require("express").Router();

router.get("/", getGrievances);
router.post("/", addGrievance);

module.exports = router;
