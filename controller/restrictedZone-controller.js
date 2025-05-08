import { supabase } from "../config/supabaseConfig.js";


const getZones = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('RestrictedZones')
            .select('coorArray')

            res.send(data);
            
    } catch (error) {
        console.log("Error getting zones:", error);
        return res.status(500).json({ error: "Failed to get zones" });
    }
}



export {getZones}