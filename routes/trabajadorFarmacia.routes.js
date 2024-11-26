import { Router } from "express";
import {
  getAllTrabajadores,
  getTrabajadorById,
  postTrabajador,
  putTrabajador,
  deleteTrabajador,
  getTrabajadorByNombre,
} from "../controllers/trabajadorFarmacia.controller.js"; // Ajusta la ruta según sea necesario

const trabajador = Router();

// Rutas para trabajadores
trabajador.get("/", getAllTrabajadores); // Obtener todos los trabajadores

trabajador.get("/:id", getTrabajadorById); // Obtener trabajador por ID

trabajador.get("/nombre/:nombre", getTrabajadorByNombre); // Buscar trabajador por nombre parcial

trabajador.put("/:id", putTrabajador); // Actualizar trabajador por ID

trabajador.post("/", postTrabajador); // Crear un nuevo trabajador

trabajador.delete("/:id", deleteTrabajador); // Eliminar trabajador por ID

export default trabajador;
