const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const Store = require("../models/storeModel");



const report_store = asyncHandler(async(req, res)=> {
    const storeId = req.params._id;
    const transactions = []

    const deliveryToStore = await Store.find({
        type: 'pd',
        to_store: new mongoose.Types.ObjectId(storeId)
    }).populate("to_store", "name")
    .populate("product", "name")
    transactions.push(deliveryToStore)
    const saleAndUseProduct = await Store.find({
        to_store: new mongoose.Types.ObjectId(storeId),
        $or: [
            { type: 'ps' },
            { type: 'pps' },
            { type: 'pu' },
        ],

    }).populate("to_store", "name")
    .populate("product", "name")
    .populate("serve", "serveName")

    transactions.push(saleAndUseProduct)
    let result = {};

for (const transactionArray of transactions) {
    for (const transaction of transactionArray) {
       
        
        // Ensure the date is a string before trying to split
        if (transaction.date instanceof Date) {
            // Convert the Date object to a string
            const dateString = transaction.date.toISOString().split('T')[0];
            const type = transaction.type;
    
            // If date doesn't exist in the result, create an empty object for it
            result[dateString] = result[dateString] || {};
    
            // If type doesn't exist in the date object, create an empty array for it
            result[dateString][type] = result[dateString][type] || [];
    
            // Push the transaction to the corresponding array
            result[dateString][type].push(transaction);
        } else {
            console.error(`Transaction has a non-Date date:`, transaction);
        }
    }
}


// Sort the dates in descending order
const sortedDates = Object.keys(result).sort((a, b) => new Date(b) - new Date(a));

// Create a new object with sorted dates
const sortedResult = {};
for (const date of sortedDates) {
    sortedResult[date] = result[date];
}


res.status(201).json(sortedResult);
})

module.exports = {
    report_store
}