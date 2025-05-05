// const { mode } = require("colours");
const AsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const protect = AsyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Extracting the token
            token = req.headers.authorization.split(" ")[1];

            // Verifying the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Fetching the user from the database
            req.user = await User.findById(decoded.id).select("-password");

            if (!req.user) {
                res.status(404).json({ message: "User not found" });
                return;
            }

            next();
        } catch (error) {
            console.error("Token validation failed:", error.message);
            res.status(401).json({ message: "Invalid Token: Access Denied" });
        }
    } else {
        res.status(401).json({ message: "No Token: Access Denied" });
    }
});

module.exports = protect;
