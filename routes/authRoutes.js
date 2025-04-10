import express from "express";


import {
  registerUser
} from "../controller/auth-controller.js";

const authRouter = express.Router();

//Register route, used to save extra data about user in database
authRouter.post("/register", registerUser);


/*

NOT SURE IS NECESSARY, IS BEING HANDLED IN FRONTEND

//Login route
authRouter.post("/login", loginUser);

//Logout route
authRouter.post("/logout", logoutUser);

*/

//dummy route to check if the server is running
authRouter.get("/", (req, res) => {
  res.status(200).json({ message: "Auth route is working" });
});

export { authRouter };
