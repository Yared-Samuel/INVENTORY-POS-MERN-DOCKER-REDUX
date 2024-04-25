const asyncHandler = require('express-async-handler')
const Category = require("../models/productCategoryModel")


const createCategory =asyncHandler (async (req, res) => {
    const {name, description} =  req.body;

    if(!name) {
        res.status(400)
        throw new Error("Please fill in name")
    }

    const category = await Category.create({
        name,
        description,
        user: req.user.id
    })

    res.status(201).json(category)
})


const getCategories = asyncHandler(async(req, res)=>{
    const categories = await Category.find().sort("-createdAt")

    res.status(200).json(categories)
})


module.exports ={
            createCategory,
            getCategories
        
        }