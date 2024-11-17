const express = require("express");
const router = express.Router();
const roomsController = require("../controllers/roomsController");
const verifyJWT = require("../middleware/verifyJWT");

router.use(verifyJWT);

router.route("/").get(roomsController.getAllRooms);

module.exports = router;
