const router = require("express").Router();
const {
  createAnonymousGrievance,
  getAnonymousGrievance,
  modifyAnonymousGrievanceStatus,
} = require("../controllers/grievance/anonymousGrievance");

// create a new anonymous grievance
router.post("/", createAnonymousGrievance);

// get details of a grievance using tracking id
router.get("/:trackingId", getAnonymousGrievance);

// get details of a grievance using id
router.get("/id/:grievanceId", getAnonymousGrievance);

// modify status of a anonymous grievance
router.patch("/status/:grievanceId", modifyAnonymousGrievanceStatus);

module.exports = router;
