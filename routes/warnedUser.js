import express from "express";
import { addAlert } from "../controller/alert-controller.js";

const warnedUser = express.Router();

//Fetching all active drones to display on live map

warnedUser.post("/", addAlert); //Path????

export { warnedUser }