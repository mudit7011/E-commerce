import express from "express";
import { isAuthenticated, loginUser, logoutUser, registerUser, resetPasswordOtp, resetUserPassword, sendVerifyOtp, verifyEmail } from "../controllers/user.controllers.js";
import authUser from "../middleware/userAuth.js";


 const authRouter = express.Router()


authRouter.post("/register",registerUser)
authRouter.post("/logIn",loginUser)
authRouter.post("/logOut",logoutUser)
authRouter.post("/send-verify-otp",authUser,sendVerifyOtp)
authRouter.post("/verify-account",authUser,verifyEmail)
authRouter.post("/isAuth",authUser,isAuthenticated)
authRouter.post("/reset-otp",resetPasswordOtp)
authRouter.post("/reset-password",resetUserPassword)


export default authRouter;