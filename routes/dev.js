// routes to be used in development mode only
const router = require("express").Router();

const { addDepartment } = require("../controllers/department/department");
const {
  addGrievanceStatus,
} = require("../controllers/grievance/grievanceStatus");

const { addGrievanceType } = require("../controllers/grievance/grievanceType");

router.post("/grievance-status", addGrievanceStatus);

router.post("/grievance-type", addGrievanceType);

router.post("/department", addDepartment);

module.exports = router;
