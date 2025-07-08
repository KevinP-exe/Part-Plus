const clientsController = {};
import clientsModel from "../models/clientsModel.js";

// Obtener todos los clientes
clientsController.getclients = async (req, res) => {
  try {
    const clients = await clientsModel.find();
    res.status(200).json(clients);
  } catch (error) {
    console.log("error: " + error);
    res.status(500).json({ message: "Error al obtener los clientes." });
  }
};

// Crear un nuevo cliente
clientsController.createclients = async (req, res) => {
  try {
    const { name, email, password, phone, age } = req.body;

    // Validaciones personalizadas
    if (!name || !email || !password || !phone || !age) {
      return res.status(400).json({ message: "Todos los campos son obligatorios." });
    }

    // Validar formato de email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "El formato del email no es válido." });
    }

    // Verificar si el cliente ya existe con el mismo correo
    const existingClient = await clientsModel.findOne({ email });
    if (existingClient) {
      return res.status(400).json({ message: "Ya existe un cliente con este correo electrónico." });
    }

    // Validar que la edad sea un número
    if (isNaN(age)) {
      return res.status(400).json({ message: "La edad debe ser un número." });
    }

    // Crear nuevo cliente
    const newClient = new clientsModel({ name, email, password, phone, age });
    await newClient.save();

    res.status(200).json({ message: "Cliente guardado exitosamente." });
  } catch (error) {
    console.log("error: " + error);
    res.status(500).json({ message: "Error al guardar el cliente." });
  }
};

// Eliminar un cliente
clientsController.deleteclients = async (req, res) => {
  try {
    const deletedClient = await clientsModel.findByIdAndDelete(req.params.id);
    if (!deletedClient) {
      return res.status(404).json({ message: "Cliente no encontrado." });
    }
    res.status(200).json({ message: "Cliente eliminado exitosamente." });
  } catch (error) {
    console.log("error: " + error);
    res.status(500).json({ message: "Error al eliminar el cliente." });
  }
};

// Actualizar un cliente
clientsController.updateclients = async (req, res) => {
  try {
    const { name, email, password, phone, age } = req.body;

    // Validaciones personalizadas
    if (!name || !email || !password || !phone || !age) {
      return res.status(400).json({ message: "Todos los campos son obligatorios." });
    }

    // Validar formato de email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "El formato del email no es válido." });
    }

    // Validar que la edad sea un número
    if (isNaN(age)) {
      return res.status(400).json({ message: "La edad debe ser un número." });
    }

    // Actualizar el cliente
    const updatedClient = await clientsModel.findByIdAndUpdate(
      req.params.id,
      { name, email, password, phone, age },
      { new: true }
    );
    if (!updatedClient) {
      return res.status(404).json({ message: "Cliente no encontrado." });
    }

    res.status(200).json({ message: "Cliente actualizado exitosamente." });
  } catch (error) {
    console.log("error: " + error);
    res.status(500).json({ message: "Error al actualizar el cliente." });
  }
};

export default clientsController;

