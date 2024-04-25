const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");


const adjust_measurment = asyncHandler(async (req, res, next)=>{
    try {
    const {product_id, sub_measurment_value }= req.body
    const prod = await Product.findOne({_id: product_id});
        if(sub_measurment_value){
    
            
            const  sub_value = prod.sub_measurment_value;
            req.value = sub_value || 1

            const measured_by = prod.sub_measurment
            req.measured_by = measured_by
        }else {
            req.value = 1
            const measured_by = prod.measurment
            req.measured_by = measured_by
        }

        next()
    } catch (error) {
        res.status(401)
    throw new Error("Error in product measurment")
    }
})

module.exports = adjust_measurment