const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        require: true,
    },
    email:{
        type: String,
        require: true,
    },
    phone:{
        type: String,
        require: true,
    },
    password:{
        type: String,
        require: true,
    },    
    isAdmin:{
        type: Boolean,
        default: false,
    },
});

//2nd way to bcrypt the password
//secure the password with the bcrypt
// userSchema.pre("save",async function(){
//     // console.log("pre method",this); 
//     // it will contain all the registration data send by the user.
//     const user = this;
//     if(!user.isModified("password")){
//         next();
//     }

//     try{
//         const saltRound = await bcrypt.genSalt(10);
//         const hash_password = await bcrypt.hash(user.password, saltRound);
//         user.password = hash_password;
//     }catch(error){
//         next(error);
//     }
// })

// compare the password
userSchema.methods.comparePassword = async function(password){
    return bcrypt.compare(password, this.password);
}


//json web token
//instance methods
userSchema.methods.generateToken =async function(){
    try{
        return jwt.sign({
            userId: this._id.toString(),
            email: this.email,
            isAdmin: this.isAdmin,
        },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: "30d",
            }
        );
    }catch(error){
        console.error(error);
    }
};

//define the model or the collection name
const User = new mongoose.model("User",userSchema);
module.exports = User;