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


  //Get specific user data /api/auth/user/:user_id
  export const getUserData = async (req, res) => {

    const { user_id } = req.params;

    if (!user_id) {
      console.log("Missing user ID");
      return res.status(400).json({ error: "User ID is required" });
    }

    try {
      const { data, error } = await supabase
        .from('AuthenticatedUser')
        .select('*')
        .eq('user_ID', user_id)
        .single();

        if (error) {
          console.log("Error getting user data:", error);
          return res.status(500).json({ error: "Failed to get user data" });
        }

        const washedData = {
          firstname: data.name,
          email: data.email,
          lastname: data.lastname,
          phone: data.phone_number,
        }

        res.status(200).json(washedData);
    } catch (error) {
      console.log("Error getting user data:", error);
      return res.status(500).json({ error: "Failed to get user data" });
    }
  }



  