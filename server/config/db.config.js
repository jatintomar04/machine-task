const { default: mongoose } = require("mongoose")
const color =  require("colors")

const connectDB = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
       console.log(`DB connection success : ${conn.connection.name}`.bgGreen);
    } catch (error) {
        console.log(`db Connection failed : ${error.message}`.bgRed);
    }
}

module.exports = connectDB