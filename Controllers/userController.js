const user = require("../Models/users");
const User = require("../Models/users");
const bcrypt = require("bcryptjs");

// create user
//create a user
exports.createUser = async (req, res) => {
  console.log("createUser called");

  try {
    //request body
    const { name, email, password, gender, phone, role, HasAdminAccess } =
      req.body;
    console.log("2. Body parsed");

    //check if all required fields are provided
    if (!name || !email || !password || !gender || !phone) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    //email check
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
    console.log("3. Email checked");

    //phone number check
    const existingPhone = await User.findOne({ phone: req.body.phone });
    if (existingPhone) {
      return res.status(400).json({ message: "Phone number already exists" });
    }
    console.log("4. Phone checked");

    //encrypt password
    const salt = await bcrypt.genSalt(10);
    console.log("5. Salt generated");

    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    console.log("6. Password hashed");

    //create new user
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      gender: req.body.gender,
      phone: req.body.phone,
      role: req.body.role, // Default role is 'user' if not provided
      HasAdminAccess: req.body.HasAdminAccess || false, // Default is false if not provided
    });
    console.log("7. User created");

    await user.save();
    console.log("8. User saved");

    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating user", error: error.message });
  }
};

//login user
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    //check if all required fields are provided
    if (!email || !password) {
      return res.status(400).json({
        message: "Please provide all required fields",
      });
    }

    //check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    //check if password is correct
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    //generate a token (you can use JWT or any other method)
    //const token = generateToken(user); // Implement your token generation logic here
    const jwt = require("jsonwebtoken");
    const token = jwt.sign(
      { id: user._id, email: user.email, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};
