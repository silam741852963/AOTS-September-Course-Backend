const express = require("express");
const router = express.Router();
const roomController = require("../../controllers/roomController");

router
  .route("/")
  .get(roomController.getAllRooms)
  .post(roomController.createRoom);

router
  .route("/:id")
  .get(roomController.getRoomById)
  .put(roomController.updateRoom)
  .delete(roomController.deleteRoom);

router
  .route("/service/:roomId")
  .get(roomController.getServicesInRoom)
  .post(roomController.addServicesInRoom)
  .put(roomController.updateServicesInRoom)
  .delete(roomController.deleteServicesInRoom);
module.exports = router;
