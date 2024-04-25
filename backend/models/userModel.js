const mongoose = require("mongoose");
const bcrypt = require('bcryptjs')


const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add a name"]
    },
    email: {
        type: String,
        required: [true, "Please add a email"],
        unique: true,
        trim: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        , "Please enter valid email"
        ]
    },
    password: {
        type: String,
        required: [true, "Please add a Password"],
        minLength: [6, "Password must be up to 6 charachters"],
    },
    role: {
        type: String,
        required: [true, "Please Select Role"],
        enum: ['admin', 'storeMan','barMan','finance'],
    }

},{
    timestamps: true
})

// Encrypt Password befor saving to DB in side model
userSchema.pre("save", async function(next) {

    if(!this.isModified("password")) {
        return next()
    }
    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword

    next();
    
})

const User = mongoose.model("User", userSchema)
module.exports = User