const mongoose = require("mongoose");
const User = require("./userModel");
const Category = require("./productCategoryModel");


const productSchema = mongoose.Schema({
  
    name: {
        type: String,
        required: [true, "Please add product name"]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: User
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true,"Please add a category"],
        ref: Category
    },
    type: {
        type: String,
        enum: ['finished', 'raw', 'fixed', 'use-and-throw', "others"],
        required: [true,"Please assign type"],
    },
    measurment: {
        type: String,
        required: true,
        trim: true
    },
    sub_measurment: {
        type: String,
        trim: true
    },
    sub_measurment_value: {
        type: Number,
        trim: true,
        default: 1,
    },
    
    description: {
        type: String,
        maxLength: [100, "description must not be greater than 20 characters"],
    }
    
    
    
    
    

},{
    timestamps: true
})



const Product = mongoose.model("Product", productSchema)
module.exports = Product