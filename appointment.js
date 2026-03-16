const express = require("express");
const router = express.Router();

const appointmentController = require("../controllers/appointmentcontroller");

router.post("/book", appointmentController.createAppointment);

module.exports = router;
