import express from "express";
import { addDevice, getDevices, deleteDevice } from "../controller/device-controller.js";



const devicesRouter = express.Router();

//User adding a device
devicesRouter.post("/", addDevice)

//User fetching all devices to display on account view
devicesRouter.get("/:user_id", getDevices);

devicesRouter.delete("/:device_id", deleteDevice);



export {devicesRouter}

