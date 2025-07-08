import express from "express";
import clientsController from "../controllers/clientsController.js";

const router = express.Router();

// Ruta para obtener todos los clientes y crear un nuevo cliente
router
  .route("/")  
  .get(clientsController.getclients)  // Método para obtener todos los clientes
  .post(clientsController.createclients);  // Método para crear un nuevo cliente

// Ruta para actualizar o eliminar un cliente 
router
  .route("/:id")
  .put(clientsController.updateclients)  // Método para actualizar un cliente 
  .delete(clientsController.deleteclients);  // Método para eliminar un cliente 

export default router;