const bcrypt = require('bcrypt');
const User = require('../Models/loginSchema');
const jwt = require("jsonwebtoken");
require("dotenv").config();

const signup = async (req, res)=> {
  const { userName, fullName, email, password, confirmPassword } = req.body;
  try {

    if(!userName || !fullName || !email || !password || !confirmPassword){
        return res.status(400).json({
            success:false,
            message:"all fields are required"
        })
    }

    //check user Already exist
    const userExist = await User.findOne({
        where:{
            email
        }
    })
    if(userExist){
        return res.status(400).json({
            success:false,
            message:"user already exist"
        })
    }
    //check userName already exist or not
    const userNameuserExist = await User.findOne({
        where:{
            userName
        }
    })
    if(userNameuserExist){
        return res.status(400).json({
            success:false,
            message:"userName already exist"
        })
    }

    if(password !== confirmPassword){
        return res.status(400).json({
            success:false,
            message:"password and confirm password does not matched"
        })
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const user = await User.create({
        userName,
        fullName,
        email,
        password: hashedPassword
    });

    return res.status(201).json({
        message: 'User created successfully',
        user
    });

  } catch (error) {
    res.status(500).json({ 
        message: 'Error signing up',
        error:error.message
     });
  }
}

const login = async (req, res)=>{

    try{
        const {email, password} = req.body;

        //validate emial and password
        if(!email || !password){
            return res.status(500).json({
                success:false,
                message:"Please fill all the fields"
            })
        }

        //check if not registered
        const user = await User.findOne({
            where:{
                email
            }
        })
        if(!user){
            return res.status(400).json({
                success:false,
                message:"user is not registered"
            })
        }
        
        //varify password and generate jwt token
        const payload = {
            email:user.email,
            id:user.id
        }
        if(await bcrypt.compare(password, user.password)){

            let token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn:"10h",
            })

            user.password = undefined
            user.confirmPassword = undefined

            return res.status(200).json({
                success:true,
                userData:{
                    user,
                    token
                }
            })

        }else{
            return res.status(400).json({
                success:false,
                message:"password incorrect"
            })
        }

    }catch{
        res.status(500).json({ 
            message: 'Error while login',
            error:error.message
         });
    }
}

module.exports = { signup, login };
