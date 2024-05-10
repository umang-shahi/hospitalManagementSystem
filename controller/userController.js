import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { User } from "../models/userSchema.js";
import { generateToken } from "../utils/jwtToken.js";

export const patientRegister = catchAsyncErrors(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    password,
    nic,
    dob,
    gender,
    role,
  } = req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !password ||
    !nic ||
    !dob ||
    !gender ||
    !role
  ) {
    return next(new ErrorHandler("Please fill full form!", 400));
  }
  const user = await User.findOne({ email });
  if(user){
    return next(new ErrorHandler("User already Registered!"),400)
  }
  user = await User.create({
    firstName,
    lastName,
    email,
    phone,
    password,
    nic,
    dob,
    gender,
    role,
  })
  generateToken(user,"User Registered!",200,res);
});

export const login = catchAsyncErrors(async(req,res,next)=>{
   const {email, password, confirmPassword, role} = req.body;
   if(!email || !password || !confirmPassword || !role){
    return next(new ErrorHandler("Please Provide all details!"),400);
   }
   if(password !== confirmPassword){
    return next(new ErrorHandler("Password and confirmPassword don't match!"),400);
   }
   const user = await User.findOne({email}).select("+password");
   if(!user){
    return next(new ErrorHandler("Invalid Password or Email!"),400);
   }
   const isPasswordMatched = await user.comparePassword(password);
   if(!isPasswordMatched){
    return next(new ErrorHandler("Invalid Password or Email!"),400);
   }
   if(role !== user.role){
    return next(new ErrorHandler("User with this role not found!"),400)
   }
   generateToken(user,"User Registered!",200,res);
})

