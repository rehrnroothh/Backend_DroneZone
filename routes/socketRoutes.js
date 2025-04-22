import { Router } from "express";
import { takeDownDrone } from "../controller/socket-controller.js";


const emitRouter = Router();

emitRouter.post("/takeDownDrone", takeDownDrone);

export { emitRouter };
