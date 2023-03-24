const {
  addGrievance,
  getGrievances,
} = require("../controllers/grievance/grievance");

const router = require("express").Router();

router.get("/", getGrievances);
router.post("/", addGrievance);

module.exports = router;
