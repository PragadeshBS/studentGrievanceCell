const router = require("express").Router();
const { adminLogin } = require("../controllers/admin/adminAuth");
const {
  getAllGrievances,
  getGrievanceById,
  getAllAnonymousGrievances,
  getAnonymousGrievanceById,
} = require("../controllers/admin/grievances");
const {
  getStaffsFromDepartment,
  getStaffById,
} = require("../controllers/admin/staff");
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

// get all staffs from a department
router.get("/staffs/view/department/:deptId", protect, getStaffsFromDepartment);

// get a single staff by id
router.get("/staffs/view/details/:staffId", protect, getStaffById);

module.exports = router;
