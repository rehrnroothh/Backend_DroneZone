import {supabase} from "../config/supabaseConfig.js";

//Used to get all devices for a user /api/device/:user_id
const getDevices = async (req, res) => {

    const { user_id } = req.params;

    if (!user_id) {
        console.log("Missing user ID");
        return res.status(400).json({ error: "User ID is required" });
    }


    try {
        const { data, error } = await supabase
            .from('Devices')
            .select('*')
            .eq('user_ID', user_id)

        if (error) {
            console.log("Error getting devices:", error);
            return res.status(500).json({ error: "Failed to get devices" });
        }

        //All devices returned        
        res.status(200).json(data);
    } catch (error) {
        console.log("Error getting devices:", error);
        return res.status(500).json({ error: "Failed to get devices" });
    }
}


//Used to add a droneDevice to the database /api/device
const addDevice = async (req, res) => {
    
    const { user_id, deviceID, deviceName } = req.body;

    if (!user_id || !deviceID || !deviceName) {
        console.log("Missing required fields");
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const { error } = await supabase
            .from('Devices')
            .insert({
                user_ID: user_id,
                deviceID: deviceID,
                deviceName: deviceName
            })

        if (error) {
            console.log("Error adding device:")
            console.log(error)
            return res.status(500).json({ error: "Failed to add device" });
        }

        res.status(200).json({ message: "Device added successfully" });
    } catch (error) {
        console.log("Error adding device:", error);
        return res.status(500).json({ error: "Failed to add device" });
    }
    
}



export {addDevice, getDevices}

