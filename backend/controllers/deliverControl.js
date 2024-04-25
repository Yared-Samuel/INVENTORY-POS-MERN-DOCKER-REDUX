const mongoose = require("mongoose");
const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");
const Inventory = require("../models/inventoryModel");
const Store = require("../models/storeModel");

const createDelivery = asyncHandler(async (req, res) => {
    const deliveries = req.body; // An array of delivery objects
  
    const type = "pd";
    const user = req.user.id;
    const deliveryResults = [];
    const deliveryResults_two = [];

    // For Lop for each delivery  
    for (const delivery of deliveries) {
      let data={}
      let data_two = {}
      const { product, quatity, to_store, tin, date, to_mainstore } = delivery;  // extracting data 
      
      const date_now = new Date(); // creating date 
      // Validation
      if (!type || !product || !quatity || !date || !user || !to_store || !to_mainstore) {
        res.status(400);
        throw new Error("Some fields are mandatory");
      }
      // Purchased product quantity
      const purchasedQuantity = [
        {
          $match: {
            type: "pp",
            product: new mongoose.Types.ObjectId(product),
            to_mainstore: new mongoose.Types.ObjectId(to_mainstore),
          },
        },
        {
          $group: {
            _id: null,
            currentBalance: { $sum: "$quatity" },
          },
        },
      ];
      // Delivered product quantity
      const deliveredQuantity = [
        {
          $match: {
            type: "pd",
            product: new mongoose.Types.ObjectId(product),
            to_mainstore: new mongoose.Types.ObjectId(to_mainstore),
          },
        },
        {
          $group: {
            _id: null,
            deliverysum: { $sum: "$quatity" },
          },
        },
      ];
  
      // Checking if the product total purchse
      const totalPurchased = (await Inventory.aggregate(purchasedQuantity)) || 0;
      const totaldelivered = (await Inventory.aggregate(deliveredQuantity)) || 0;
      // check if product is purchased
      if(totalPurchased.length <= 0) {  
        res.status(400);
        throw new Error("This item is not purchased");
      }

      
          // quantity adjustment to submeasurment
      const measurment_val = await Product.findById(product)

      let measurment = measurment_val.sub_measurment_value
      // define procuct by sub-measurment
      if(measurment == null){
        measurment = 1
      }
      
      const  quantity = quatity * measurment
    let delivered
    let purchased
    let availableQuantty
    if (totaldelivered[0] === undefined) {
         delivered = 0;
         purchased = totalPurchased[0].currentBalance;
        delivered = delivered / measurment

         availableQuantty = purchased - delivered;

    }else {
         delivered = totaldelivered[0].deliverysum;
         purchased = totalPurchased[0].currentBalance;
        delivered = delivered / measurment
         availableQuantty = purchased - delivered;

    }
  
    if(availableQuantty < quatity){
        res.status(400);
        throw new Error("Please check your balance");
    }

    const purchasePrice = await Inventory
    .find({ type: "pp", product: new mongoose.Types.ObjectId(product) })
    .sort({ date: -1 }) // Sort in descending order by date
    .limit(1); 
    
      const unit_price = purchasePrice[0].unit_price
      const unit_price_calc = unit_price / measurment
      const unit_price_calc_dec = parseFloat(unit_price_calc.toFixed(2))
      const unit_price_two = unit_price 
      if(unit_price == undefined){
        res.status(400);
        throw new Error("Not able to get purchase price")
      }
      const total_price = unit_price_calc * quantity
      const total_price_two = unit_price_two * quatity

    data = {
        type,
        product,
        quatity : quantity,
        date: date || date_now,
        to_store,
        unit_price: unit_price_calc_dec,
        total_price,
        to_mainstore,
        tin,
        user,
    }
    data_two = {
        type,
        product,
        quatity,
        date: date || date_now,
        to_store,
        unit_price: unit_price_two,
        total_price: total_price_two,
        to_mainstore,
        tin,
        user,
    }

    deliveryResults.push(data);
    deliveryResults_two.push(data_two);

      
    
      
    }
    const InvDeliverCreated =await Inventory.insertMany(deliveryResults_two, { ordered: false })
    const StoreDeliverCreated =await Store.insertMany(deliveryResults, { ordered: false })
    if(InvDeliverCreated && StoreDeliverCreated && InvDeliverCreated.length !== 0 && StoreDeliverCreated !== 0){
        res.status(201).json({InvDeliverCreated,StoreDeliverCreated})
    }else{
        res.status(400);
        throw new Error("Items not delivered!");
    }
    
  });

  const getAllDelivery = asyncHandler(async (req, res) => {
    const allDelivery = await Store.find({ type: "pd" })
      .populate("to_store", "name")
      .populate("to_mainstore", "name")
      .populate("product", "name measurment sub_measurment sub_measurment_value")
      .sort({date: -1})
    res.status(201).json(allDelivery);
  });

  module.exports = {
    createDelivery,  
    getAllDelivery,  
    };