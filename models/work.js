const mongoose = require('mongoose');
const config = require('../config/database');
const fs = require('fs');

//user schema
const WorkSchema = mongoose.Schema({
    username:{
        type:String,
        required: true
    },
    workname:{
        type:String,
        required: true
    },
    workdescription:{
        type:String,
        required: false
    },
    link:{
        type:String,
        required: false
    },
    image:{
        type:Buffer,
        required:false
    }
});

const Work =module.exports= mongoose.model('Work',WorkSchema);


module.exports.addWork = function(newWork,callback){
            
            newWork.save(callback);
     
};
module.exports.getWorksByUsername = function(username,callback){
    const query = {username:username}
    Work.find(query,callback);
}
