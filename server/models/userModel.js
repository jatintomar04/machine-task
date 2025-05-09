const  mongoose  = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type : String,
            required :true
        },
        email :{
            type : String,
            required :true,
            unique : true
        },
        phone :{
            type : String,
            required :true,
            unique : true
        },
        password :{
            type : String,
            required :true,
        },
        isAdmin : {
            type : Boolean,
            default : false,
            require : true
        },
        profilePicture: {
            type: String, 
            default: "", 
          },

          documents: [
            {
              type: String, 
            }
          ],
    }, {
        timestamps : true
    }
);


module.exports = mongoose.model("User", userSchema)