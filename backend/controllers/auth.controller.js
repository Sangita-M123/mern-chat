import User from "../models/usermodel.js";
import bcrypt from "bcryptjs";
import generateTokens from "../utils/generateToken.js";
export const signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "passwords do not match" });
    }
    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ error: "user already exists" });
    }
    const salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(password,salt);
    // https://avatar-placeholder.iran.liara.run/
    const boyprofilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlprofilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic: gender === "Male" ? boyprofilePic : girlprofilePic,
    });
   if(newUser){
     generateTokens(newUser._id,res);
     await newUser.save();
     return res.status(201).json({
         _id: newUser._id,
         fullName: newUser.fullName,
         username: newUser.username,
         profilePic: newUser.profilePic,
       });
   }else{
     return res.status(400).json({ error: "user not created" });
   }
  } catch (error) {
    console.log("signup error",error.message);
    res.status(500).json({ error: "something went wrong" });
  }
};

export const login = async(req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const isPasswordCorrect = await bcrypt.compare(password, user?.password || "" );
    if(!user || !isPasswordCorrect){
      return res.status(400).json({ error: "invalid username or password" });
    }
   // console.log(res.cookie);
   const tokens = generateTokens(user._id,res)
    console.log(tokens);
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username, 
      profilePic: user.profilePic,
      tokens,
    })
  } catch (error) {
    console.log("login error",error.message);
    res.status(500).json({ error: "something went wrong" });
  }
};
export const logout = async (req, res) => {
  try{
    res.cookie("jwt","",{maxAge:0});
    res.status(200).json({message:"logged out successfully"});
  }catch(error){
    console.log("logout error",error.message);
    res.status(500).json({ error: "something went wrong" });
  }
};
