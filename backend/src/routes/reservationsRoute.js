
import express from "express";
import reservationController from "../controllers/reservationsController.js";

const router = express.Router();

// Ruta para crear una nueva reserva
router.post("/", reservationController.createReservation);

// Ruta para obtener todas las reservas
router.get("/", reservationController.getAllReservations);

// Ruta para obtener las reservas de un cliente específico 
router.get("/client/:clientId", reservationController.getReservationsByClient);

// Ruta para obtener una reserva específica 
router.get("/:id", reservationController.getReservationById);

// Ruta para actualizar una reserva 
router.put("/:id", reservationController.updateReservation);

// Ruta para eliminar una reserva 
router.delete("/:id", reservationController.deleteReservation);

export default router;
