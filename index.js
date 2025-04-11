import express from "express";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";
import { instrument } from "@socket.io/admin-ui";
import cors from "cors";

/*Import of the HTTP routers here  */
import { authRouter } from "./routes/authRoutes.js";
import { devicesRouter } from "./routes/devicesRoutes.js";
import { zoneRouter } from "./routes/restrictedZoneRoutes.js";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: [
      "http://admin.socket.io",
      "https://admin.socket.io",
      "http://localhost:8080",
      "https://localhost:8080",
      "http://localhost:5173",
      "https://localhost:5173",
    ],
    credentials: true,
  },
});

dotenv.config(); //Load environment variables from .env file

//Middleware which parses incoming requests body from JSON into an object
app.use(express.json());
app.use(cors());

/* HTTPS endpoints here */
app.use("/api/auth", authRouter);
app.use("/api/device", devicesRouter);
app.use("/api/zone", zoneRouter);

/*Websockets events here*/
io.on("connection", (socket) => {
  console.log("A user connected: ", socket.id);

  socket.on("disconnect", (socket) => {
    console.log("A user disconnected: ", socket.id);
  });

  /*TODO: Implement the socket events here */
});

// Admin dashboard configuration for socket.io
instrument(io, {
  auth: false,
  mode: "development",
});

//Start the server with the http server since app.listen() would not work with socket.io
const PORT = process.env.PORT || 8080;
httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Socket.io Admin UI is accessible at http://admin.socket.io`);
});
