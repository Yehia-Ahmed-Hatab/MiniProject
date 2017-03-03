const mongoose = require('mongoose');
const config = require('../config/database');
const fs = require('fs');

//user schema
const PortfolioSchema = mongoose.Schema({
    username:{
        type:String,
        
        unique:true,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required: true
    },
    
    image:{
        type:String, //le7ad mangeb 3'ero :'D
        required:false
    }
});

const Portfolio =module.exports = mongoose.model('Portfolio',PortfolioSchema);


module.exports.addPortfolio = function(newPortfolio,callback){
            
            newPortfolio.save(callback);
     
}