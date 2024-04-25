const mongoose = require("mongoose");
const StoreList = require("./storeList");
const Product = require("./productModel");
const User = require("./userModel");
const Serve = require("./serveListModel");
const MainStore = require("./mainStore");


const storeSchema = mongoose.Schema({
    type: {
        type: String,
        enum: ['pd', 'ps', 'pu','pps'],
        // pd-product distribute ps-product sale pu-product consumed pps-product processed soled
        required: [true, "Trasnaction type is required"],
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        // required: [true, "Product is required"],
        ref: Product,
        default: null
    },
    serve: {
        type: mongoose.Schema.Types.ObjectId,
        // required: [true, "Service is required"],
        ref: Serve,
        default: null
    },
    
    quatity: {
        type: Number,
        required: [true, "Quantity is required"],
        trim: true
    },
    unit_price: {
        type: Number,
        default: 0,
        required: [true, "Unit price is required!"]
    },
    total_price: {
        type: Number,
        default: 0,
        required: [true, "Total price is required!"],
        trim: true
    },
    to_store: { // for delivery only
        type: mongoose.Schema.Types.ObjectId,
        ref: StoreList,
        default: null
    },
    to_mainstore: {  // For purchase and delivery
        type: mongoose.Schema.Types.ObjectId,
        ref: MainStore,
        default: null
    },
    measured_by: {
        type: String,
        default: false
    },
    date: {
        type: Date,
        required: [true, "Date is required"]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: User
    },

},{
    timestamps: true
})


const Store = mongoose.model("Store", storeSchema)
module.exports = Store