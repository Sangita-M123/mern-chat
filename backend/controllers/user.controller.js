import User from "../models/usermodel.js";
export const getUsersFroSidebar=async(req,res)=>{
  try {
    // const  loggedIndUserId=req.user._id;
    // const filteredUsers = await User.find({_id:{$ne:loggedIndUserId}})
    const filteredUsers = await User.find().select("-password")
    res.status(200).json(filteredUsers)
    
  } catch (error) {
    console.error("error in getUsersFroSidebar",error.message);
    res.status(500).json({error:"something went wrong"})
  }
}