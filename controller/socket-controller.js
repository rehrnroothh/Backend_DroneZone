import { io } from "../index.js";
const takeDownDrone = async (req, res) => {
    
    const message = req.body;
    
    //Send emit message to all connected clients
    io.emit("takeDownDrone", message);

    console.log("Message sent to all clients, clients should be disconnected");

    //Responds the initiator of the request
    res.status(200).json({ message: "Drone taken down requested" });
};


export { takeDownDrone } ;
