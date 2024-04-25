const asyncHandler = require("express-async-handler");
const storeList = require("../models/storeList")
const priceList = require("../models/sellingPriceModel")



const find_price = asyncHandler(async (req, res, next) => {
    try {
    const {product_id, to_store }= req.body
  
    // get Store with saling price
    if(!product_id || !to_store) {
        res.status(400);
        throw new Error("Some fields are mandatory");
    }
    const storePrice = await storeList.findOne({_id: to_store})
                                      .populate('sPrice', 'name')
                                                           
    if(storePrice.length == 0){
        res.status(400);
        throw new Error("Price not found in Store model");
    }
     // Selling price ID
    const price_id = storePrice.sPrice._id
    
    
    // get selling price data assigned to store
    const price = await priceList.findOne(price_id)
    const products = price.products
    // filter product and price
    const filterProducts = products.filter(product => product.product == product_id);
    if(filterProducts.length === 0) {
        res.status(404);
        throw new Error("Please Configure price for the product selected!");
    }
    // const sellingPrice = filterProducts.length > 0 ? filteredProducts[0].sellingPrice : null;
    const sellingPrice = filterProducts[0].sellingPrice;
    const product_in_price = filterProducts[0].product

        req.product_id = product_in_price
        req.product_selling_price = sellingPrice
        req.to_store = to_store
    next()
} catch (error) {
    res.status(401)
    throw new Error("Cannot configure selling price")
}
})

module.exports= find_price