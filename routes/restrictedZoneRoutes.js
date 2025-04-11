import express from "express";
import { getZones } from "../controller/restrictedZone-controller.js";



const zoneRouter = express.Router();


zoneRouter.get("/restricted", getZones);


export {zoneRouter}
