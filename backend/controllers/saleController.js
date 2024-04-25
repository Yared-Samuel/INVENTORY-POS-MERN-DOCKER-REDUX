const priceConfig = require("../helper/priceConfig");
const Inventory = require("../models/inventoryModel");
const Product = require("../models/productModel");
const Serve = require("../models/serveListModel");
const StoreList = require("../models/storeList");
const Store = require("../models/storeModel");
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const priceList = require("../models/sellingPriceModel");


// Sale of products

const sale = asyncHandler(async (req, res) => {
  const sales = req.body;
  const user = req.user.id;
  const type = "ps"

  const saleResult = [];

  // the LOOP


  for (const sale of sales) {
    let data = {};
    const { product, quantity, serve, to_store, date, pice } = sale;
    const currentDate = new Date();

    if (!quantity || !to_store) {
      res.status(400);
      throw new Error("Some fields are mandatory");
    }
    if (!product && !serve) {
      res.status(400);
      throw new Error("Both product and serve can't be null");
    }



    const soledQuantity = [
      {
        $match: {
          // type: { $in: ["ps", "pps"] },
          type: "ps",
          product: new mongoose.Types.ObjectId(product),
          to_store: new mongoose.Types.ObjectId(to_store),
        },
      },
      {
        $group: {
          _id: null,
          soledSum: { $sum: "$quatity" },
        },
      },
    ];
    // Delivered product quantity
    const deliveredQuantity = [
      {
        $match: {
          type: "pd",
          product: new mongoose.Types.ObjectId(product),
          to_store: new mongoose.Types.ObjectId(to_store),
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
    const totalSoled = (await Store.aggregate(soledQuantity)) || 0;
    const totalDelivered = (await Store.aggregate(deliveredQuantity)) || 0;
    if (totalDelivered.length === 0) {
      res.status(400);
      throw new Error("This item is not available!");
    }

    /// Price config ////
    const storePrice = await StoreList.findOne({ _id: to_store }).populate(
      "sPrice",
      "name"
    );

    if (storePrice.length == 0) {
      res.status(400);
      throw new Error("Price not found in Store model");
    }
    // Selling price ID
    const price_id = storePrice.sPrice._id;
    // get selling price data assigned to store
    const price = await priceList.findOne(price_id);
    const products = price.products;
    
    // filter product and price

    const transformedData = products.map(item => {
      return {
        product: item.product.toString(),
        sellingPrice: item.sellingPrice,
        _id: item._id
      };
    });

    const filterProducts = transformedData.filter(item => item.product === product);

    
    
    if (filterProducts.length == 0) {
      res.status(404);
      throw new Error("Configure price for the product selected!");
    }
    // const sellingPrice = filterProducts.length > 0 ? filteredProducts[0].sellingPrice : null;
    const sellingPrice = filterProducts[0].sellingPrice;
    const product_in_price = filterProducts[0].product;
    if (!sellingPrice || !product_in_price) {
      res.status(404);
      throw new Error("Please Configure price for the product selected!");
    }

    let product_selling_price = sellingPrice;

    // quantity adjustment to submeasurment
    const measurment_val = await Product.findById(product);
    let measurment = measurment_val.sub_measurment_value;
    let measured_by
    // define procuct by sub-measurment
    if (measurment == null) {
      measurment = 1;
      
    }

    let calculatedQuantity;
    if (pice == false) {
      //ጅምላ
      calculatedQuantity = quantity * measurment;
      calculatedPrice = calculatedQuantity * product_selling_price;
    } else if (pice == true) {
      // ችርቻሮ
      calculatedQuantity = quantity;
      calculatedPrice = calculatedQuantity * product_selling_price;
    }

    if(calculatedQuantity == quantity){
      measured_by = measurment_val.sub_measurment
    }else{
      measured_by = measurment_val.sub_measurment
    }

    let soled;
    let delivered;
    let availableQuantty;

    if (totalSoled[0] === undefined) {
      soled = 0;
    } else {
      soled = totalSoled[0];
    }
    if (totalDelivered[0] === undefined) {
      delivered = 0;
    } else {
      delivered = totalDelivered[0];
    }

    availableQuantty = delivered.deliverysum - soled.soledSum;
    if (availableQuantty <= 0) {
      res.status(400);
      throw new Error("Please check your balance!");
    }

    data = {
      type,
      product,
      quatity: calculatedQuantity,
      unit_price: product_selling_price,
      total_price:calculatedPrice,
      serve:null,
      to_store,
      measured_by,
      user,
      date: date || currentDate,
    };

    saleResult.push(data)

  }
 
  
  const storeSaleCreated = await Store.insertMany(saleResult, {ordered: false})
  if(storeSaleCreated){
    res.status(201).json(storeSaleCreated)
  }else{
    res.status(400)
    throw new Error("Sales not created!")
  }
});

const getAllSales = asyncHandler(async (req, res) => {
  const allSales = await Store.find({
    $or: [
      { type: "ps" },
      // { 'type': "pps" },
    ],
  })
    .populate("to_store", "name")
    .populate("product", "name")
    .populate("serve", "serveName")
    .sort("-createdAt");
  res.status(200).json(allSales);
});

const serviceSale = asyncHandler(async (req, res) => {
  const serveResult = [];
  const serveGroups = req.body

  const user = req.user.id;
  const type = "pps";
  const currentDate = new Date();

  for (const serveGroup of serveGroups){
    let data = {}
    const { product, to_store, quantity, date } = serveGroup;

    const serveList = await Serve.findById(product);
  if (!serveList) {
    res.status(400);
    throw new Error("Service not found!");
  }
  const servePrice = serveList.servePrice;
  const serveMeasure = serveList.serveMeasure;
  const unit_price = servePrice;
  const total_price = servePrice * quantity;

  if (!product || !to_store || !quantity) {
    res.status(400);
    throw new Error("Fields are required!");
  }

  // Store list check

  const storeType = await StoreList.findById(to_store);
  storeRaw = storeType.processing.toString();
  const raw = "raw";

  if (storeRaw !== raw) {
    res.status(400);
    throw new Error("Store type not match product!");
  }
  data = {
    type,
    serve: product,
    quatity: quantity,
    unit_price,
    total_price,
    to_store: to_store,
    measured_by: serveMeasure,
    date: date || currentDate,
    user,
  }

  serveResult.push(data)
  }

  const storeServeCreated = await Store.insertMany(serveResult, {ordered: false})

  if(storeServeCreated){
    res.status(201).json(storeServeCreated)
  }else{
    res.status(400)
    throw new Error("Serve Sale created!")
  }

});

const getServiceSale = asyncHandler(async (req, res) => {
  const getServiceSales = await Store.find({ type: "pps" })
    .populate("to_store", "name")
    .populate("serve", "serveName")
    .sort("-date");
  res.status(201).json(getServiceSales);
});

// Use of products

const useProducts = asyncHandler(async (req, res) => {
  const dataArray = req.body;
  const results = [];
  const type = "pu";
  const user = req.user.id;

  // the LOOP


  for (const item of dataArray) {
    let data = {}
    const { quantity, date, product, to_store } = item;   
    const currentDate = new Date();

    if (!type || !quantity || !to_store || !product) {
      res.status(400);
      throw new Error("Some fields are mandatory");
    }




    const deliveredQuantity = [
      {
        $match: {
          type: "pd",
          to_store: new mongoose.Types.ObjectId(to_store),
          product: new mongoose.Types.ObjectId(product),
        },
      },
      {
        $group: {
          _id: null,
          currentBalance: { $sum: "$quatity" },
        },
      },
    ];


    const usedQuantity = [
      {
        $match: {
          type: { $in: ["pu", "ps"] },
          to_store: new mongoose.Types.ObjectId(to_store),
          product: new mongoose.Types.ObjectId(product),
        },
      },
      {
        $group: {
          _id: null,
          currentBalance: { $sum: "$quatity" },
        },
      },
    ];

    const totalDelivered = (await Store.aggregate(deliveredQuantity)) || 0;
    const totalUsed = (await Store.aggregate(usedQuantity)) || 0;

    if (totalDelivered.length === 0) {
      res.status(400);
      throw new Error("This item is not available!");
    }

    let used;
    let delivered;
    let availableQuantity

    if (totalUsed[0] === undefined) {
      used = 0;
    } else {
      used = totalUsed[0];
    }
    if (totalDelivered[0] === undefined) {
      delivered = 0;
    } else {
      delivered = totalDelivered[0];
    }
    availableQuantity = delivered.deliverysum - used;
    if (availableQuantity <= 0 || availableQuantity < quantity) {
      res.status(400);
      throw new Error("Please check your balance!");
    }

    // Purchase price

    const purchasePrice = await Inventory
    .find({ type: "pp", product: new mongoose.Types.ObjectId(product) })
    .sort({ date: -1 }) // Sort in descending order by date
    .limit(1); 

    const unit_price = purchasePrice[0].unit_price
    if(unit_price == undefined){
      res.status(400);
      throw new Error("Not able to get purchase price")
    }
    const total_price = unit_price * quantity
    

    data={
      type,
      product,
      quatity: quantity,
      unit_price,
      total_price,
      to_store,
      date,
      user
    }
    results.push(data)
  }



  const useProductCreated = await Store.insertMany(results, {ordered: false})
  
  
  

  if(useProductCreated){
    res.status(201).json(useProductCreated)
  }else{
    res.status(400)
    throw new Error("Product use not created!")
  }
});

const getUseProducts = asyncHandler(async (req, res) => {
  const getUsedProducts = await Store.find({ type: "pu" })
    .populate("to_store", "name")
    .populate("product", "name")
    .sort("-createdAt");

  res.status(201).json(getUsedProducts);
});

module.exports = {
  sale,
  getAllSales,
  serviceSale,
  getServiceSale,
  useProducts,
  getUseProducts,
};
