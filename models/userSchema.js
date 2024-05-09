import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
        minLength: [3,"First Name must contain at least three characters!"]
    },
    lastName:{
        type: String,
        required: true,
        minLength: [3,"Last Name must contain at least three characters!"]
    },
    email:{
        type: String,
        required: true,
        validate: [validator.isEmail,"Please provide a valid email!"]
    },
    phone:{
        type: String,
        required: true,
        minLength: [10,"Phone Number must contain Exact 10 digits!"],
        maxLength: [10,"Phone Number must contain Exact 10 digits!"],
    },
    nic:{
        type: String,
        required: true,
        minLength: [10,"NIC must contain Exact 10 digits!"],
        maxLength: [10,"NIC must contain Exact 10 digits!"],
    },
    dob:{
        type: Date,
        required: [true,"DOB is required!"]
    },
    gender:{
        type: String,
        required: true,
        enum: ["Male","Female"]
    },
    password:{
        type: String,
        required:true,
        select:false,
        minLength:[10,"Password must contain at least 10 characters!"]
    },
    role:{
        type: String,
        required: true,
        enum: ["Admin","Patient","Doctor"],
    },
    doctorDepartment:{
        type: String
    },
    docAvatar:{
        public_id: String,
        url: String,
    }
})

userSchema.pre("save",async function(next){
   if(!this.isModified("password")){
    next();
   }
   this.password = await bcrypt.hash(this.password,10);
})

export const User = mongoose.model("User",userSchema);