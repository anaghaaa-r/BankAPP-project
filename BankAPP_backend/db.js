const mongoose=require('mongoose')


//state connection string

mongoose.connect('mongodb://localhost:27017/BankAPP', 
{useNewUrlParser: true})


//model creation/collection

const User=mongoose.model('User',{
    acno: Number,
    uname: String,
    pswd: String,
    Balance: Number,
    transaction: Array
})

module.exports={User}