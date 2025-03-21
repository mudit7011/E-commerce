import User from "../models/user.models.js "

export const getUserData = async (req,res)=>{

    try {

        const {userId} = req.body;

    const user = await User.findById(userId)

    if(!user){
        return res.json({success:true,message:"User is not found"})
    }

    return res.json({success:true,userData:{
        name: user.name,
        isVerified:user.isVerified
    }})
        
    } catch (error) {
        return res.json({success:false,message:error.message})
    }


}