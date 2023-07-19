const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://priyeshanand9:TRr2MgufCfooKVil@cluster0.kwhssjk.mongodb.net/user' , {useUnifiedTopology:true, useNewUrlParser:true})

const connection = mongoose.connection
connection.on('connected', ()=> {
    console.log("Connection successful")
})
connection.on('error', ()=> {
    console.log("Connection failed")
})

module.exports = mongoose