const mongoose = require("mongoose");
const User = require("./userModel");
const StoreCat = require("./storeListCatModel");
const SPrice = require("./sellingPriceModel")

const storeListSchema = mongoose.Schema({
    
    processing: {
        type: String,
        enum: ['finished', 'raw', 'fixed', 'use-and-throw', "others"],
        required: [true, "Configure Processing method"],       
    },
    sPrice: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Please configure price"],
        ref: SPrice
    },
    name: {
        type: String,
        required: [true, "Store name is required!"]
    }, 
    operator: {
        type: String,
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

const StoreList = mongoose.model('StoreList', storeListSchema)
module.exports = StoreList;