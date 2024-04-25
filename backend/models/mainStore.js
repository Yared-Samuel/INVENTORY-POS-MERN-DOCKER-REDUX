const mongoose = require("mongoose");
const User = require("./userModel");


const mainStoreSchema = mongoose.Schema({
    
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

const MainStore = mongoose.model('MainStore', mainStoreSchema)
module.exports = MainStore;