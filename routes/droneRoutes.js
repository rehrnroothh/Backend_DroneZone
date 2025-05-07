import { getAllDrones } from "../controller/drone-controller.js";
import express from "express";


const droneRouter = express.Router();

//Fetching all active drones to display on live map

droneRouter.get("/activeDrones", getAllDrones);


export {droneRouter}
