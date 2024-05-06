import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'

const loginUser = async (req,res ) =>{
    const {email,password} = req.body;
    
    try {
        //validator email and password
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"email is invalid"})
        }
        if(password.length<8){
            return res.json({success:false,message:"Please enter a strong password!"})
        }

        //check user exists
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({success:false,message:"user not found"})
        }

        //check password
        const validPassword = await bcrypt.compare(password,user.password);
        if(!validPassword){
            return res.json({success:false,message:"password is invalid"})
        }

        //create token
        const token = createToken(user._id);
        console.log(email,"login successfull!");
        return res.json({success:true,token});
    } catch (error) {
        console.log(error);
        return res.json({success:true,message:"Login User Error !"});
    }
}

const createToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET);
}

const registerUser = async (req,res) =>{
    const {name,email,password} = req.body;
    try {
        //validator name email and password
        if(name.length===0){
            return res.json({success:false,message:"name is invalid"})
        }
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"email is invalid"})
        }
        if(password.length<8){
            return res.json({success:false,message:"Please enter a strong password!"})
        }

        //check user exists
        const exists = await userModel.findOne({email});
        if(exists){
            return res.json({success:false,message:"user already exists"})
        }
        

        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        //create user
        const newUser = new userModel({
            name:name,
            email:email,
            password:hashedPassword
        });
        const user = newUser.save();
        const token = createToken(user._id);
        console.log(email,"register successfull!");
        return res.json({success:true,token});
    } catch (error) {
        console.log(error);
        return res.json({success:true,message:"Register User Error !"});
    }
}


export {loginUser,registerUser};