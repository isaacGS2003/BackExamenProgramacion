import TrabajadorFarmacia from "../models/trabajadorFarmacia.models.js";
import mongoose from "mongoose";

// Obtener todos los trabajadores
export const getAllTrabajadores = async (req, res) => {
  console.log("Obtiene todos los trabajadores");
  try {
    const trabajadores = await TrabajadorFarmacia.find({}, { __v: 0 });
    if (trabajadores.length === 0) {
      return res.status(404).json({
        msg: "No se encontraron trabajadores",
      });
    }
    return res.status(200).json({
      trabajadores,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Error al obtener los trabajadores",
    });
  }
};

// Obtener trabajador por ID
export const getTrabajadorById = async (req, res) => {
  console.log("Trabajador por ID");
  const id = req.params.id;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        msg: "ID no válido",
      });
    }

    const trabajador = await TrabajadorFarmacia.findById(id);
    if (!trabajador) {
      return res.status(404).json({
        msg: "Trabajador no encontrado",
      });
    }

    return res.status(200).json({
      trabajador,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Error al obtener el trabajador",
    });
  }
};

// Buscar trabajadores por nombre parcial
export const getTrabajadorByNombre = async (req, res) => {
  const { nombre } = req.params;

  try {
    if (!nombre || typeof nombre !== "string") {
      return res.status(400).json({ msg: "Nombre no válido" });
    }

    const trabajadores = await TrabajadorFarmacia.find({
      nombre: { $regex: nombre, $options: "i" }, // Búsqueda insensible a mayúsculas
    });

    if (trabajadores.length === 0) {
      return res
        .status(404)
        .json({ msg: "No se encontraron trabajadores con ese nombre" });
    }

    return res.status(200).json({ trabajadores });
  } catch (error) {
    console.error("Error en getTrabajadorByNombre:", error);
    return res.status(500).json({ msg: "Error al obtener los trabajadores" });
  }
};

// Crear un nuevo trabajador
export const postTrabajador = async (req, res) => {
  console.log("Post trabajador");
  const body = req.body;
  const trabajador = new TrabajadorFarmacia(body);

  try {
    const validationError = trabajador.validateSync();
    if (validationError) {
      const errorMessages = Object.values(validationError.errors).map(
        (error) => error.message
      );
      return res.status(400).json({
        errors: errorMessages,
      });
    }

    await trabajador.save();
    return res.status(201).json({
      msg: "Trabajador guardado correctamente",
      trabajador,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Error al guardar el trabajador",
    });
  }
};

// Actualizar un trabajador por ID
export const putTrabajador = async (req, res) => {
  console.log("Put trabajador");
  const id = req.params.id;
  const body = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        msg: "ID no válido",
      });
    }

    const trabajador = await TrabajadorFarmacia.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
    if (!trabajador) {
      return res.status(404).json({
        msg: "Trabajador no encontrado o actualizado",
      });
    }

    return res.status(200).json({
      msg: "Trabajador actualizado correctamente",
      trabajador,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Error al actualizar el trabajador",
    });
  }
};

// Eliminar un trabajador por ID
export const deleteTrabajador = async (req, res) => {
  console.log("Delete trabajador");
  const id = req.params.id;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        msg: "ID no válido",
      });
    }

    const trabajador = await TrabajadorFarmacia.findByIdAndDelete(id);
    if (!trabajador) {
      return res.status(404).json({
        msg: "Trabajador no encontrado o eliminado",
      });
    }

    return res.status(200).json({
      msg: "Trabajador eliminado correctamente",
      trabajador,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Error al eliminar el trabajador",
    });
  }
};
