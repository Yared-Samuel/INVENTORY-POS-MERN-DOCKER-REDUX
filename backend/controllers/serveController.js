const mongoose = require("mongoose")
const Service = require("../models/serveListModel")
const asyncHandler = require("express-async-handler")
const Inventory = require("../models/inventoryModel");
const Store = require("../models/storeModel");

const service = asyncHandler(async (req, res)=>{

    const type = "ps"
    const user = req.user.id
})