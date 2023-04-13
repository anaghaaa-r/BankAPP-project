const express = require('express')
const ds = require('./DataService')
const depo = require('./DepositService')
const jwt = require('jsonwebtoken')
const cors = require('cors')

//app creation
const app = express()

app.use(express.json())

app.use(cors({
	// origin: 'http://localhost:55391'
    origin: '*'
}))

const jwttokenmiddleware = ((req, res, next) => {
    try
    {
        const token = req.headers["x-access-token"]
        console.log("TOKEN:", token)
        const data=jwt.verify(token, 'superkey@123')
        if(req.body.acno == data.currentacno)
        {
            next()
        }
    }
    catch
    {
        return {
            statusCode: 400,
            status: false,
            message: "Please Login"
        }
    }
})

//resolving http request 2 part: head and body
app.get('/getmethod', (req, res) => {
    res.send("This is a get method")
})

app.post('/', (req, res) => {
    res.send("This is a sample post method")
})


//Creating a user
//Register API call

app.post('/register', (req, res) => {
    ds.register(req.body.acno, req.body.password, req.body.uname)
    .then(user => {
        if(user)
        {
            res.status(user.statusCode).json(user)
        }
    })
})


//Logging in

app.post('/login', (req, res) => {
    ds.login(req.body.acno, req.body.password)
    .then(user => {
        if(user)
        {
            res.status(user.statusCode).json(user)
        }
    })
})
    
//Deposit

app.post('/deposit', jwttokenmiddleware, (req, res) => {
    depo.deposit(req.body.acno, req.body.password, req.body.amount)
    .then(deposit => {
        if(deposit)
        {
            res.status(deposit.statusCode).json(deposit)
        }
    })
})

//Withdrawal

app.post('/withdraw', jwttokenmiddleware, (req, res) => {
    depo.withdraw(req.body.acno, req.body.password, req.body.amount)
    .then(withdraw => {
        if(withdraw)
        {
            res.status(withdraw.statusCode).json(withdraw)
        }
    })
})


//Transaction History
//comment1
//comment2

app.post('/transactions', (req, res) => {
    depo.transactions(req.body.acno)
    .then(transactions => {
        if(transactions)
        {
            res.status(transactions.statusCode).json(transactions)
        }
    })
})

app.delete('/delete/:acno', (req, res) => {
    depo.deleteac(req.params.acno)
    .then(result => {
        console.log("DELETE: ", result)
        if(result)
        {
            res.status(result.statusCode).json(result)
        }
    })
})

const appMiddleware = (req, res, next) => {
    res.send("Application specific middleware")
    next()
}

app.use(appMiddleware)

app.listen(3007, () => {
    console.log("Server listening to port number 3000")
})