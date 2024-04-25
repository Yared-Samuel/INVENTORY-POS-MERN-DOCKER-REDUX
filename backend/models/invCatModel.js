const mongoose = require("mongoose");
const User = require("./userModel");


const invCatSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add store category name"]
    },
    sub_Store_Code: {
        type: Number
    },
    desciption: {
        type: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: User
    },
},{
    timestamps: true
})


const InvCat = mongoose.model("InvCat", invCatSchema)
module.exports = InvCat