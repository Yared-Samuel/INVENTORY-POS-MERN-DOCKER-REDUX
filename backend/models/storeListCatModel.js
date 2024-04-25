const mongoose = require("mongoose");
const User = require("./userModel");

    const storeListCatSchema = mongoose.Schema({
        name: {
            type: String,
            required: [true, "Name is required"],
            unique: true
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
const StoreCat = mongoose.model('StoreCat', storeListCatSchema)
module.exports = StoreCat;