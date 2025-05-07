import express from "express";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";
import { instrument } from "@socket.io/admin-ui";
import cors from "cors";
import { supabase } from "./config/supabaseConfig.js";

/*Import of the HTTP routers here  */
import { authRouter } from "./routes/authRoutes.js";
import { devicesRouter } from "./routes/devicesRoutes.js";
import { zoneRouter } from "./routes/restrictedZoneRoutes.js";
import { emitRouter } from "./routes/socketRoutes.js";
import { droneRouter } from "./routes/droneRoutes.js";

dotenv.config(); //Load environment variables from .env file

const app = express();
const httpServer = createServer(app);
export const io = new Server(httpServer, {
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
  connectionStateRecovery: {} // Enables so the server sends events a client could have missed if it disconnected for a short time
});


//Middleware which parses incoming requests body from JSON into an object
app.use(express.json());
app.use(cors());

/* Static HTTP endpoints here */
app.use("/api/auth", authRouter);
app.use("/api/device", devicesRouter);
app.use("/api/zone", zoneRouter);
app.use("/api/message", emitRouter);
app.use("/api/drone", droneRouter);



/*--------------Websockets events here------------------*/

//Middleware that is being executed when a client connects
io.use((socket, next) => {

  const { userID, deviceID, flyingRoute, currentPosition, activeFlight } = socket.handshake.auth; 

  //TODO: Add checking so users USER_ID i stored in DB as well?
  if( !userID || !deviceID || !flyingRoute || !currentPosition || !activeFlight) {
    console.log("Missing required fields");
    return next(new Error("Missing required fields"));
  }

  next();
});

//TODO: Implement logic for how to handle the connection event
io.on("connection", async (socket) => {

  try {

    const { userID, deviceID, flyingRoute, currentPosition, activeFlight } = socket.handshake.auth;
  
    //Stores clients data in the database
    const { error, data } = await supabase
      .from("FlightRecord")
      .insert({
        userID: userID,
        deviceID: deviceID,
        dronePath: flyingRoute,
        currentPosition: currentPosition,
        activeFlight: activeFlight
      })
  
      //Handles error if storing flight data fails
      if (error) {
        console.error("Error storing flight data", error);
        socket.emit("flight_record_error", {error: error});
        return;
      }
  
      console.log("Successfully stored flight data");
      socket.emit("flight_record_success", { message: "Flight data stored successfully, you can now fly." });
  
  } catch (error) {
    console.error("Unexpected error in connection handler:", error);
    socket.emit("flight_record_error", { message: "An unexpected error occurred. Please try again later." });
  }
  


  //endFlight event is initialized by the client, when the client is done flying.
  // Server then want's to store the flight as not active and the flight time in the database
  socket.on("endFlight",  async (flightData) => {

    try {

      const { userID, deviceID, flightTime, activeFlight } = flightData;

      if(!userID || !deviceID || !flightTime || activeFlight === null) {
        console.log("Missing required fields");
        socket.emit("flight_end_failed", { message: "Missing required fields" });
        return;
      }

      //Stores clients data in the database
      const { error, data } = await supabase
      .from("FlightRecord")
      .update({
        activeFlight: false,
        flightTime: flightTime
      })
      .eq("userID", userID)
      .eq("deviceID", deviceID)
      .eq("activeFlight", true);
      
      

      //Handles error if storing flight data fails
      if (error) {
        console.error("Error ending flight", error);
        socket.emit("flight_end_failed", { message: "Failed to store flight data. Please end flight again." });
        return;
      }

      console.log("Successfully ended flight");
      socket.emit("flight_end_success", { message: "Flight ended successfully." });
    } catch (error) {

      console.error("Error ending flight", error);
      socket.emit("flight_end_failed", { message: "An unexpected error occurred when closing flight. Please end flight again." });
    }
  });
 


  //TODO: Implement logic for how to handle the updatePosition event
  // Just update the position in the DB
  socket.on("updatePosition", async (data) => {
    try {
      console.log("Position updated", data);
    } catch (error) {
      console.error("Error updating position", error);
    }
  });


  socket.on("disconnect", () => {
    console.log("A user disconnected: ", socket.id); 
  });


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
