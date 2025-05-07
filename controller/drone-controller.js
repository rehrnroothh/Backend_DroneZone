import { supabase } from "../config/supabaseConfig.js";

export const getAllDrones = async (req, res) => {

    try {
        const { data, error } = await supabase
            .from('FlightRecord')
            .select("dronePath, deviceID, currentPosition")
            .eq('activeFlight', true)

        if (error) {
            console.log("Error getting drones:", error);
            return res.status(500).json({ error: "Failed to get drones" });
        }

        console.log(data);
    
        res.status(200).json(data);

    } catch (error) {
        console.log("Error getting drones:", error);
        return res.status(500).json({ error: "Failed to get drones" });
    }
}