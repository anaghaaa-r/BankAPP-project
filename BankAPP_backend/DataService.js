const jwt = require('jsonwebtoken')
const db = require('./db')

//Register and Login
    
database =
{
    1000: {acno: 1000, uname: "Vignesh", password: 1000, Balance: 10000, transaction:[]}
}

const register = (acno, pswd, uname)=>{
    
    return db.User.findOne({ acno }) //"acno:acno"
    .then(user => {
        if(user)
        {
            return {
                statusCode: 422,
                status: false,
                message: "User already exists"
            }
        }
        else
        {
            const newUser = new db.User({
                acno,
                pswd,
                uname,
                Balance: 0,
                transaction: []
            })
            newUser.save()
            return {
                statusCode: 200,
                status: true,
                message: "User created successfully"
            }
        }
    })
}



const login = (acno, password)=>
{
    return db.User.findOne({ "acno":acno, "pswd": password })
    .then(user => {
        if(user)
        {
            currentname = user.uname,
            currentacno = acno
            const token = jwt.sign({ currentacno: acno }, 'superkey@123')
            return {
                statusCode: 200,
                status: true,
                message: "Logged In Successfully",
                token,
                currentname,
                currentacno
            }
        }
        else
        {
            return {
                statusCode: 402,
                status: false,
                message: "Login Failed"
            }
        }
    })
}

module.exports = { register, login, database }