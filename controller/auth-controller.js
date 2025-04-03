export const registerUser = (req, res) => {
    const { name, lastName, ssn, email, phoneNumber, password, address } = req.body;
  
    if (!name || !email || !phoneNumber || !password || !lastName || !password || !ssn || !address) {
      return res.status(400).json({ message: "All fields are required" });
      console.log("All fields are required");
    }
  
    try {

      // TODO: Lägg till logik för att spara användare
      // Save user to database
      res.status(200).json({ message: "User registered successfully" });
    } catch (error) {
      res.status(500).json({ message: "User registration failed" });
    }
  };


  export const loginUser = (req, res) => {
    // TODO: Lägg till logik för att logga in användare
  };

  export const logoutUser = (req, res) => {
    // TODO: Lägg till logik för att logga ut användare
  };



  