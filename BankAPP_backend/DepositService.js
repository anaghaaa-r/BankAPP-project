const db = require('./DataService')

const dab = require('./db')

//Deposit
const deposit = (acno, pswd, amt) => {
    var amount = parseInt(amt)

    return dab.User.findOne({ "acno": acno, "pswd": pswd })
    .then(user => {
        console.log("USER: ", user)
        if(user)
        {
            user.Balance += amount
            user.transaction.push({
                "Type": "Deposit",
                "Mode": "Online",
                "Amount": amount,
                "Time": new Date(),
                "Balance": user.Balance
            })
            user.save()
            return {
                statusCode: 200,
                status: true,
                message: `Amount ${amount} successfully credited to account ${acno}, Your current balance is ${user.Balance}`
            }
        }
        else
        {
            return {
                statusCode: 422,
                status: false,
                message: "Transaction Failed"
            }
        }
    })
}

//Withdraw
const withdraw = (acno, pswd, amt) => {
    var amount = parseInt(amt)

    return dab.User.findOne({ "acno": acno, "pswd": pswd })
    .then(user => {
        console.log("USER: ", user)
        if(user)
        {
            user.Balance -= amount
            user.transaction.push({
                "Type": "Withdraw",
                "Mode": "Online",
                "Amount": amount,
                "Time": new Date(),
                "Balance": user.Balance
            })
            user.save()
            return {
                statusCode: 200,
                status: true,
                "message": `Amount ${amount} successfully debited from account ${acno}, Your current balance is ${user.Balance}`
            }
        }
        else
        {
            return {
                statusCode: 422,
                status: false,
                message: "Transaction Failed"
            }
        }
    })
}

//Trasactions history

const transactions = (acno) => {
    return dab.User.findOne({ acno })
    .then(data => {
        if(data){
            return{
                statusCode:200,
                status:true,
                message:"Data recieved successsfully",
                transaction: data.transaction
            }
        }
    })
}


//DeleteUser
const deleteac = (acno) => {
    return dab.User.deleteOne({ acno })
    .then(user => {
        if(user)
        {
            return {
                statusCode: 203,
                status: true,
                message: "account deleted",
                "acno": acno
            }
        }
    })
}

module.exports={ deposit, withdraw, transactions, deleteac }