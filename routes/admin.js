const router = require("express").Router();
const { adminLogin } = require("../controllers/admin/adminAuth");
const {
  getAllGrievances,
  getGrievanceById,
  getAllAnonymousGrievances,
  getAnonymousGrievanceById,
} = require("../controllers/admin/grievances");
const protect = require("../middleware/auth");

router.post("/login", adminLogin);

router.get("/grievances/view", protect, getAllGrievances);

router.get("/grievances/view/:id", protect, getGrievanceById);

router.get("/anonymous-grievances/view", protect, getAllAnonymousGrievances);

router.get(
  "/anonymous-grievances/view/:id",
  protect,
  getAnonymousGrievanceById
);

module.exports = router;
