// Import StudentController
const PatientController = require("../controllers/PatientController");

// Import express
const express = require("express");

// Membuat object router
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello World!");
});

// Routing Students
router.get("/patients", PatientController.index);
router.get("/patients/:id", PatientController.show);
router.get("/patients/search/:name", PatientController.search);
router.get("/patients/status/:name", PatientController.findByStatus);
router.post("/patients", PatientController.store);
router.put("/patients/:id", PatientController.update);
router.delete("/patients/:id", PatientController.destroy);

// Export router
module.exports = router;
