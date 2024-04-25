const asyncHandler = require("express-async-handler")
const Serve = require("../models/serveListModel")

const createServe = asyncHandler(async(req, res)=>{
    const {serveName, serveCode, servePrice, serveMeasure} = req.body

    if(!serveName || !serveCode || !servePrice || !serveMeasure) {
        res.status(400)
        throw new Error("All fields are required!")
    }
    const nameCheck = await Serve.find({serveName: serveName})
    const codeCheck = await Serve.find({serveCode: serveCode})
    if(nameCheck.length > 0 || codeCheck.length > 0) {
        res.status(400)
        throw new Error("Name and code must be unique!")
    }
    if(servePrice <= 0) {
        res.status(400)
        throw new Error("Please fill the correct price!")
    }
    const createServeList = await Serve.create({
        serveName,
        serveCode,
        servePrice,
        serveMeasure
    });
    res.status(201).json(createServeList)
})

const getServeList = asyncHandler(async(req, res)=>{
    const getServeLists = await Serve.find()
    res.status(200).json(getServeLists) 
})

// Update serve list

const updateServeList = asyncHandler(async(req, res)=>{
    const {serveName, serveCode, servePrice, serveMeasure} = req.body
    const serveList = await Serve.findById(req.params.id)

    if(!serveList){
        res.status(404)
        throw new Error("List not found");
      }
    
        // Update
        const updatedServeList = await Serve.findByIdAndUpdate(
            {_id: req.params.id},
            {
                serveName,
                serveCode,
                servePrice,
                serveMeasure
            },
            {
                new: true,
                runValidators: true
            }
        )
        res.status(201).json(updatedServeList)
    
})

module.exports ={
    createServe,
    getServeList,
    updateServeList
}