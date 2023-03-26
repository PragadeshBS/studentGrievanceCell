const { getComments, addComment } = require("../controllers/comment/comment");
const protect = require("../middleware/auth");

const router = require("express").Router();

// get all comments for a grievance
router.get("/:grievanceId", protect, getComments);

// add a comment to a grievance
router.post("/:grievanceId", protect, addComment);

module.exports = router;
