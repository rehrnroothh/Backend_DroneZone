import express from "express";


import {
  registerUser,
  getUserData
} from "../controller/auth-controller.js";

const authRouter = express.Router();

//Register route, used to save extra data about user in database
authRouter.post("/register", registerUser);


//Get specific user data 
authRouter.get("/user/:user_id", getUserData);

/*

NOT SURE IS NECESSARY, IS BEING HANDLED IN FRONTEND

//Login route
authRouter.post("/login", loginUser);

//Logout route
authRouter.post("/logout", logoutUser);

*/

//dummy route to check if the server is running

export { authRouter };
