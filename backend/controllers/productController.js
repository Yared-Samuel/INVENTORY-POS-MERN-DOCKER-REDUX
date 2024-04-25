const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");

const createProduct = asyncHandler(async (req, res) => {
  const { name, category, measurment,  description,sub_measurment,sub_measurment_value, type } = req.body;
  const user = req.user.id; // because of protected route
  // validation
  if (!name || !user || !category || !measurment || !type) {
    res.status(400);
    throw new Error("Please fill product details correctly!");
  }
  const nameCheck = await Product.findOne({name})
  
  if(nameCheck) {
    res.status(400)
    throw new Error("Product name or Code already exist!")
  }

  const product = await Product.create({
    name,
    category,
    measurment,
    sub_measurment,
    sub_measurment_value,
    description,
    type,
    user,
  });
  res.status(201).json(product)
});

const getProducts =asyncHandler (async (req, res) => {
    const products = await Product.find().sort("-createdAt").populate('category', 'name');
    res.status(200).json(products)
})



const updateProduct =asyncHandler (async (req, res) => {
    const {  name, category, measurment, min_stock, description, sub_measurment, type } = req.body;
  const user = req.user.id; // because of protected route

  const product = await Product.findById(req.params.id)

  if(!product){
    res.status(404)
    throw new Error("Product not found");
  }
  
  // upadte product
  const updatedProduct = await Product.findByIdAndUpdate(
    {_id: req.params.id},
    {
    name,
    category,
    measurment,
    min_stock,
    description,
    sub_measurment,
    type
    },
    {
        new: true,
        runValidators: true
    }
  )
  res.status(201).json(updatedProduct)
})



const getFinishedProducts =asyncHandler (async (req, res) => {
  const finished = await Product.find({type: "finished"}).sort("-createdAt").populate('category', 'name');
  
  res.status(200).json(
    finished
  )
})
const getRawProducts =asyncHandler (async (req, res) => {
  const raw = await Product.find({type: "raw"}).sort("-createdAt").populate('category', 'name');
 
  res.status(200).json(
    raw
  )
})
const getFixedProducts =asyncHandler (async (req, res) => {
  const fixed = await Product.find({type: "fixed"}).sort("-createdAt").populate('category', 'name');
  res.status(200).json(
    fixed
  )
})
const getUseAndThrowProducts =asyncHandler (async (req, res) => {
  const use_and_throw = await Product.find({type: "use-and-throw"}).sort("-createdAt").populate('category', 'name');
  res.status(200).json(
    use_and_throw
  )
})
const getOtherProducts =asyncHandler (async (req, res) => {  
  const others = await Product.find({type: "others"}).sort("-createdAt").populate('category', 'name');
  res.status(200).json(
    others
  )
})


module.exports = {
    createProduct,
    getProducts,
    updateProduct,
    getOtherProducts,
    getUseAndThrowProducts,
    getFixedProducts,
    getRawProducts,
    getFinishedProducts,
    

};
