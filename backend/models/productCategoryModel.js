const mongoose = require("mongoose");
const User = require("./userModel");


const productCategorySchema = mongoose.Schema({
    
    name: {
        type: String,
        required: [true, "Please add Category Name"]
    },
    description: {
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



const Category = mongoose.model("Category", productCategorySchema)
module.exports = Category