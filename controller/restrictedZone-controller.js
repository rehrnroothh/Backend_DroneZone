import { supabase } from "../config/supabaseConfig.js";


const getZones = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('RestrictedZones')
            .select('coorArray')
            .eq('zoneID', '0bcf1844-be48-45dd-af40-47d2b117580f')

            console.log(data[0]);
            res.send(data[0]);

    } catch (error) {
        console.log("Error getting zones:", error);
        return res.status(500).json({ error: "Failed to get zones" });
    }
}



export {getZones}