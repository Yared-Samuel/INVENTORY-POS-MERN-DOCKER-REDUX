const asyncHandler = require("express-async-handler");
const Sprice = require("../models/sellingPriceModel");
const { ObjectId } = require('mongodb'); 

const createSprice = asyncHandler(async (req, res) => {
  const { name, products } = req.body;
  
  if (!name) {
    res.status(400);
    throw new Error("All fields are required");
  }

//   const productEntries = products.map((product) => ({
//     product: product.product,
//     sellingPrice: product.price,
//   }));
  const createPrice = await Sprice.create({
    name,
    products: products,
  });

  res.status(201).json(createPrice);
});

const getSprice = asyncHandler(async (req, res) => {
  const sPrice = await Sprice.find().populate("products.product", "name");

  res.status(200).json(sPrice);
});

const updateSprice = asyncHandler(async (req, res) => {
  const id = req.params._id;
  const updatedData = req.body;

  try {
    // Find the Sprice document by ID
    const getPrice = await Sprice.findById(id);

    if (!getPrice) {
      return res.status(404).json({ message: 'Sprice not found' });
    }

    // Loop through the products in updatedData
    for (const updatedProduct of updatedData.products) {
      // Find the index of the product in the products array
      const productIndex = getPrice.products.findIndex(
        (product) => product.product.toString() === updatedProduct.product
      );

      // If product not found, insert it as a new product
      if (productIndex === -1) {
        const newProduct = {
          product: updatedProduct.product,
          sellingPrice: updatedProduct.sellingPrice,
        };

        getPrice.products.push(newProduct);
      } else {
        // If product found, replace the existing product and sellingPrice
        getPrice.products[productIndex] = {
          product: updatedProduct.product,
          sellingPrice: updatedProduct.sellingPrice,
        };
      }
    }

    // Save the updated Sprice document
    const updatedSprice = await getPrice.save();

    res.status(201).json(updatedSprice);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});





module.exports = {
  createSprice,
  getSprice,
  updateSprice
};

