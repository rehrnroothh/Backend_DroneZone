import { supabase } from "../config/supabaseConfig.js";

export const getAllDrones = async (req, res) => {

    try {
        const { data, error } = await supabase
            .from('FlightRecord')
            .select("dronePath, deviceID, currentPosition, userID")
            .eq('activeFlight', true)

        if (error) {
            console.log("Error getting drones:", error);
            return res.status(500).json({ error: "Failed to get drones" });
        }


        // const deviceIDArray = data.map((item) => item.deviceID);

        const deviceNameArray = await Promise.all(data.map(async (item) => {

            const { data, error } = await supabase
            .from('Devices')
            .select('deviceName')
            .eq('deviceID', item.deviceID)
            .single();
            
            if (error) {
                console.log("Error getting device name for deviceID:", item.deviceID, error);
                return null; // Returnera null för just den platsen i arrayen
            }

            return data.deviceName;
        }));


        const washedData = data.map((item, index) => ({
            ...item,
            droneID: deviceNameArray[index]
        }));

        res.status(200).json(washedData);

    } catch (error) {
        console.log("Error getting drones:", error);
        return res.status(500).json({ error: "Failed to get drones" });
    }
}