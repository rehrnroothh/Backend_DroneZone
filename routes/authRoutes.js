import express from "express";

import { registerUser, loginUser, logoutUser } from "../controller/auth-controller.js";


const authRouter = express.Router();


//Register route
authRouter.post("/register", registerUser);
  
//Login route
authRouter.post("/login", loginUser);

//Logout route
authRouter.post("/logout", logoutUser);


export {authRouter};



  