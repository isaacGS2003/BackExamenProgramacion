import trabajador from "./trabajadorFarmacia.routes.js";
import { Router } from "express";

const indexRoutes = Router();

indexRoutes.use("/trabajadores", trabajador);

export default indexRoutes;
