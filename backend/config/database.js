const mongoose = require('mongoose');
const connectToDataBase = ()=>{ 
     mongoose.connect(process.env.MongoUri).then(()=>{
        console.log('database is sucessfully connected');
     }).catch((error)=>{
        console.log(error);
     })
}
module.exports = connectToDataBase;