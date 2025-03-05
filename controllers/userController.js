const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const { use } = require("../routes/contactRoutes");

// register a user
// POST /api/users/register
// access public 

const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      res.status(400);
      throw new Error("all fields are mandatory");
    }
    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
      res.status(400);
      throw new Error("User already exists");
    }
    // hashing password
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password:hashedPassword });
    console.log("Registered user ", user);
    if (user) {
      res.status(201).json({
        _id: user.id,
        email: user.email,
      });
    }
    else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  });


// login a user
// POST /api/users/login
// access public 

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400);
      throw new Error("all fields are mandatory");
    }
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jsonwebtoken.sign({
            user: { 
                username:user.username, 
                email: user.email, 
                id: user.id }
            }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
        res.status(200).json({token: `${accessToken}`});
    }
    else {
      res.status(401);
      throw new Error("password is not valid");
    }
  });

// current user info
// GET /api/users/current
// access private 
 
const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user);
  });


module.exports = {registerUser, loginUser, currentUser};