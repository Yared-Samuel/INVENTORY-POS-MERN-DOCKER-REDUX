const asyncHandler = require('express-async-handler')
const StoreCat = require('../models/storeListCatModel');
const StoreList = require('../models/storeList');
const MainStore = require('../models/mainStore')

const createStoreCategory = asyncHandler(async(req, res)=>{
    const {name , description} = req.body;
    const user_creater = req.user.id;
    if(!name) {
        res.status(400)
        throw new Error("Category name is required!")
    }
    const nameCheck = await StoreCat.findOne({name})
    if(nameCheck) {
        res.status(400)
        throw new Error("Product name already exist!")
    }

    const category = await StoreCat.create({
        name,
        description,
        user : user_creater
    });
    res.status(201).json(category)

})

const getStoreCategory = asyncHandler(async(req, res) =>{
    const categoies = await StoreCat.find().sort("-createdAt");
    res.status(200).json(categoies)
})


////////  Store List   /////////


const createStore = asyncHandler(async(req, res)=>{
    const {name, operator, description, sPrice , processing} = req.body;
    const user_creater = req.user.id;
    if(!name ||  !processing || !sPrice) {
        res.status(400)
        throw new Error("Some fildes are required!")
    }

    if(processing == "finished" && !sPrice){
        res.status(400)
        throw new Error("For finished stores selling price is required")
    }
    const nameCheck = await StoreCat.findOne({name})
    if(nameCheck) {
        res.status(400)
        throw new Error("Product name already exist!")
    }

    const stores = await StoreList.create({
        name,
        description,
        operator,
        sPrice,
        processing,
        user : user_creater
    });
    
    res.status(201).json(stores)

})

const getStores = asyncHandler(async(req, res) =>{
    const storeLists = await StoreList.find()
                            .populate('sPrice', 'name',)
    
                            
    res.status(200).json(storeLists)
})

// Get store by process

const storeFinished = asyncHandler(async(req, res) =>{
    
    const storeFinishedLists = await StoreList.find({processing: "finished"})
                            .populate('sPrice', 'name',)

                            
    res.status(200).json(storeFinishedLists)
})
const storeRaw = asyncHandler(async(req, res) =>{
    
    
    const storeRawLists = await StoreList.find({processing: "raw"})
                            .populate('sPrice', 'name',)                            
    res.status(200).json(storeRawLists)
})
const storeFixed = asyncHandler(async(req, res) =>{
    
    
    const storeFixedLists = await StoreList.find({processing: "fixed"})
                            .populate('sPrice', 'name',)
    
                            
    res.status(200).json(storeFixedLists)
})

const storeUseAndThrow = asyncHandler(async(req, res) =>{
    const storeUseAndThrowLists = await StoreList.find({processing: "use-and-throw"})
                            .populate('sPrice', 'name',)
    
    res.status(200).json(storeUseAndThrowLists)
})
const storeOthers = asyncHandler(async(req, res) =>{
    const storeOthersLists = await StoreList.find({processing: "others"})
                            .populate('sPrice', 'name',)
                            
    res.status(200).json(storeOthersLists)
})

// main store

const createMainStore = asyncHandler(async(req, res)=>{
    const {name, operator, description } = req.body;

    const user_creater = req.user.id;
    if(!name ) {
        res.status(400)
        throw new Error("Category name is required!")
    }

    
    const nameCheck = await StoreCat.findOne({name})
    if(nameCheck) {
        res.status(400)
        throw new Error("Store name already exist!")
    }

    const stores = await MainStore.create({
        name,
        description,
        operator,
        user : user_creater
    });
    
    res.status(201).send(stores)

})

const getMainStore = asyncHandler(async(req, res) =>{
    const mainStoreList = await MainStore.find()
                            
                            
    res.status(200).send(mainStoreList)
})



module.exports ={
     createStoreCategory,
     getStoreCategory,
     createStore,
     getStores,
     storeFinished,
     storeRaw,
     storeFixed,
     storeUseAndThrow,
     storeOthers,
     createMainStore,
     getMainStore
    }