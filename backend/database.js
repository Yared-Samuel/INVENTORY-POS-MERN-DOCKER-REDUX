const mongoose = require('mongoose');

const connectDatabase = () =>{
    mongoose.connect(process.env.DB)
}

// this is comment