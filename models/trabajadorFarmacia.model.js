import mongoose from "mongoose";

const trabajadorFarmaciaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true, // Obligatorio
  },
  apellido: {
    type: String,
    required: true, // Obligatorio
  },
  puesto: {
    type: String,
    required: true, // Obligatorio
    enum: [
      "Cajero",
      "Farmacéutico",
      "Auxiliar de Farmacia",
      "Gerente",
      "Encargado de Inventario",
      "Repartidor",
      "Limpieza",
    ], // Opciones válidas
  },
  horario: {
    type: String,
    required: true, // Obligatorio
  },
  salario: {
    type: Number,
    required: true, // Obligatorio
    min: 0, // No puede ser negativo
  },
  telefono_contacto: {
    type: String,
    required: false, // Opcional
  },
  fecha_contratacion: {
    type: Date,
    required: true, // Obligatorio
    default: Date.now, // Por defecto, la fecha actual
  },
});

const TrabajadorFarmacia = mongoose.model(
  "TrabajadorFarmacia",
  trabajadorFarmaciaSchema
);

export default TrabajadorFarmacia;
