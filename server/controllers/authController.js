const AsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken")
const User = require ("../models/userModel")
const bcrypt = require("bcryptjs")

const registerUser = AsyncHandler (async(req,res) => {
 
    const {name ,email, phone, password } = req.body;

    if (!name || !email || !phone || !password) {
        res.status (400);
        throw new Error("Please Fill All Details")
    }

    const emailExist = await User.findOne({email :email})
    const phoneExist = await User.findOne({phone :phone})

    if( emailExist || phoneExist ) {
        res.status (400)
        throw new Error("User all-ready exist")
    }

    const salt =  await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt )



    const user = await User.create({name, email, phone, password : hashedPassword})

    if(!user) {
        res.status(400);
        throw new Error("user cannot be created!")
    }else{
        res.status(201).json({
            id : user._id,
            name: user.name,
            email:user.email,
            isAdmin : user.isAdmin,
            token : generateToken(user._id)
        })
    }
});


// login user 

const loginUser = AsyncHandler(async(req,res) => {

    const {email, password} = req.body;

    if(!email || !password) {
        res.status(400)
        throw new Error ("Please Fill All Details")
    }

    // email exist 

    const user = await User.findOne({email : email})

    if(user && bcrypt.compareSync(password, user.password)){
        res.status(200).json({
            id : user._id,
            name: user.name,
            email:user.email,
            isAdmin : user.isAdmin,
            token : generateToken(user._id)
        })
    }else{
        res.status(401)
        throw new Error ('Invalid credential!')
    }
   
});

// generate token 

const generateToken = (id) =>{
    return token = jwt.sign({id}, process.env.JWT_SECRET,{expiresIn : "30d"})
}






module.exports = { registerUser, loginUser}
