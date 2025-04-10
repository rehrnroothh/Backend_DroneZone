import { supabase } from "../config/supabaseConfig.js";

// Register user on path /api/auth/register
export const registerUser = async (req, res) => {
    const { user_id, name, lastname, pnummer, email, phone, adress, city, zip } = req.body;

    console.log(req.body);
  
    if (!user_id || !name || !lastname || !email || !phone || !pnummer|| !adress || !city || !zip) {
      console.log("Missing required fields");
      return res.status(400).json({ message: "All fields are required" });
    }

  
    try {
      // Saves extra user data to table AuthenticatedUser
      const { error } = await supabase
      .from('AuthenticatedUser')
      .insert({
        user_ID : user_id,
        name: name,
        lastname: lastname,
        personal_number: pnummer,
        email: email,
        phone_number: phone,
        adress: adress,
        city: city,
        zip: zip
      })

      if (error) {
        console.log("Error registering user:",error);
        return res.status(500).json({ message: "User registration failed" });
      }

      res.status(200).json({ message: "User registered successfully" });

    } catch (error) {
      res.status(500).json({ message: "User registration failed" });
    }
  };




  