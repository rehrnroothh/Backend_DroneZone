import { supabase } from "../config/supabaseConfig.js";

export const addAlert = async (req, res) => {
    const { user_id, alertContent } = req.body; // Extracting information from the request

    // Check that required information is present
    if (!user_id || !alertContent) {
        console.log("Missing required fields");
        return res.status(400).json({ message: "UserID and AlertContent are required!" });
    }

    try {
        const { error } = await supabase
            .from('Alerts')
            .insert({
                user_ID: user_id,
                alertContent: alertContent,
                alertTimeStamp: new Date().toISOString(), // Current timestamp in ISO format
                alertRead: false // Assuming alertRead is a boolean field
            });

        // Error management
        if (error) {
            console.log("Error adding alert:", error.message);
            console.log("Error details:", error.details);
            console.log("Error hint:", error.hint);
            return res.status(500).json({ error: "Failed to add alert", details: error.message });
        }

        res.status(200).json({ message: "Alert added successfully" });
    } catch (error) {
        console.log("Error adding alert:", error.message);
        return res.status(500).json({ error: "Failed to add alert", details: error.message });
    }
};