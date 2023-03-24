// routes to be used in development mode only
const router = require("express").Router();

const {
  addGrievanceStatus,
} = require("../controllers/grievance/grievanceStatus");

const { addGrievanceType } = require("../controllers/grievance/grievanceType");

router.post("/grievance-status", addGrievanceStatus);

router.post("/grievance-type", addGrievanceType);

module.exports = router;
