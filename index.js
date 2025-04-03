import express from "express";
import dotenv from "dotenv";
import { createServer } from "http"; 
import { Server } from "socket.io"; 

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: "*" } });

dotenv.config();

/*Import of the Routers  */
import {authRouter} from "./routes/authRoutes.js";

//Middleware which parses incoming requests body from JSON into an object
app.use(express.json());

/* HTTP endpoints */
app.use("/api/auth", authRouter);


const PORT = process.env.PORT || 3000;

//Start the server with the http server since app.listen() would not work with socket.io
httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
