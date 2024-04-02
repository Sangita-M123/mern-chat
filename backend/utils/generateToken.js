import jwt from "jsonwebtoken";
const JWT_SECRET = "abcdefghigklmnopqrstwxyz";
const ROOT_ENV="development"
const generateTokens =(userId,res)=>{
  const token =jwt.sign({userId},JWT_SECRET,{
    expiresIn:"15d",
  });
  return token;
  // res.cookie("jwt",token,{
  //   maxAge:15*24*60*60*1000,
  //   httpOnly:true,
  //   sameSite:"strict",
  //   secure:ROOT_ENV !=="development",
  // })
  // console.log(token)
}
export default generateTokens;