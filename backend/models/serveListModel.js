const mongoose = require("mongoose")
const User = require("./userModel")

const serveSchema = mongoose.Schema({
    serveName: {
        type: String,
        required: [true, "Name is required!"],
    },
    serveCode: {
        type: Number,
        required: [true, "Code is required!"],
    },
    servePrice: {
        type: Number,
        required: [true, "Price is required!"]
    },
    serveMeasure: {
        type: String,
        required: [true, "Measurment is required!"],
    },

}, {
    timestamps: true
})

const Serve  = mongoose.model('Serve', serveSchema)
module.exports = Serve;