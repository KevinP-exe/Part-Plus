import Reservation from "../models/reservationsModel.js";

const reservationController = {};

// Crear una nueva reserva
reservationController.createReservation = async (req, res) => {
  try {
    const { clientId, vehicle, service, status } = req.body;

    // Validamos que todos los campos estén presentes
    if (!clientId || !vehicle || !service || !status) {
      return res.status(400).json({ message: "Todos los campos son obligatorios." });
    }

    // Validamos el estado 
    const validStatuses = ['pendiente', 'confirmada', 'cancelada'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: `El estado debe ser uno de los siguientes: ${validStatuses.join(', ')}` });
    }

    // Creamos una nueva reserva
    const newReservation = new Reservation({ clientId, vehicle, service, status });
    await newReservation.save();

    res.status(201).json({ message: "Reserva creada exitosamente.", reservation: newReservation });
  } catch (error) {
    console.log("error: " + error);
    res.status(500).json({ message: "Error al crear la reserva." });
  }
};

// Obtener todas las reservas
reservationController.getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find().populate('clientId');
    res.status(200).json(reservations);
  } catch (error) {
    console.log("error: " + error);
    res.status(500).json({ message: "Error al obtener las reservas." });
  }
};

// Obtener reservas por cliente
reservationController.getReservationsByClient = async (req, res) => {
  try {
    const { clientId } = req.params;

    // Verificamos si el cliente existe
    const reservations = await Reservation.find({ clientId }).populate('clientId');
    if (!reservations || reservations.length === 0) {
      return res.status(404).json({ message: "No se encontraron reservas para este cliente." });
    }

    res.status(200).json(reservations);
  } catch (error) {
    console.log("error: " + error);
    res.status(500).json({ message: "Error al obtener las reservas del cliente." });
  }
};

// Obtener una reserva 
reservationController.getReservationById = async (req, res) => {
  try {
    const { id } = req.params;

    const reservation = await Reservation.findById(id).populate('clientId');
    if (!reservation) {
      return res.status(404).json({ message: "Reserva no encontrada." });
    }

    res.status(200).json(reservation);
  } catch (error) {
    console.log("error: " + error);
    res.status(500).json({ message: "Error al obtener la reserva." });
  }
};

// Actualizar una reserva
reservationController.updateReservation = async (req, res) => {
  try {
    const { id } = req.params;
    const { vehicle, service, status } = req.body;

    // Validamos que el estado sea correcto
    const validStatuses = ['pendiente', 'confirmada', 'cancelada'];
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({ message: `El estado debe ser uno de los siguientes: ${validStatuses.join(', ')}` });
    }

    // Actualizamos la reserva
    const updatedReservation = await Reservation.findByIdAndUpdate(
      id,
      { vehicle, service, status },
      { new: true }
    ).populate('clientId');

    if (!updatedReservation) {
      return res.status(404).json({ message: "Reserva no encontrada." });
    }

    res.status(200).json({ message: "Reserva actualizada correctamente.", reservation: updatedReservation });
  } catch (error) {
    console.log("error: " + error);
    res.status(500).json({ message: "Error al actualizar la reserva." });
  }
};

// Eliminar una reserva 
reservationController.deleteReservation = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedReservation = await Reservation.findByIdAndDelete(id);
    if (!deletedReservation) {
      return res.status(404).json({ message: "Reserva no encontrada." });
    }

    res.status(200).json({ message: "Reserva eliminada correctamente." });
  } catch (error) {
    console.log("error: " + error);
    res.status(500).json({ message: "Error al eliminar la reserva." });
  }
};

export default reservationController;
