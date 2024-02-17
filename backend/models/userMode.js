const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
 
    name:{
        type:String,
        require:true
    },

    age:{
        type:Number,
        require:true
    },

    Subject:
  [
  
  ]
  
});

module.exports = mongoose.model("User",userSchema)