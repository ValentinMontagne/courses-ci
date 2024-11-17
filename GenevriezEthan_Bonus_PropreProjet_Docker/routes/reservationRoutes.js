const express = require("express");
const router = express.Router();
const reservationsController = require("../controllers/reservationsController");
const verifyJWT = require("../middleware/verifyJWT");

router.use(verifyJWT);

router.route("/").post(reservationsController.createReservation);

router.route("/:id").get(reservationsController.getValidReservationsByRoom);

router.route("/users/:userId").get(reservationsController.getReservationUser);

module.exports = router;
