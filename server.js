const express =require("express") // Express Module loading
const webserver= express()
const bodyParser = require("body-parser")
const cors = require('cors')
const port = 3200

function serverStarterCallback(){
console.log(`server listing on port on ${port}`)
}

webserver.use(cors())
webserver.use(bodyParser.json())
webserver.use(bodyParser.urlencoded({extended:false}))

webserver.listen(port, serverStarterCallback)
//http:localhost:3200/
// webserver.get("/",function(req, res){
//     res.status(200).send("Send from server")
// })

const bmiCalculationHistory =[]
const userDetails=[]


webserver.post('/bmi/calculate',function(req, res){
    const bmiInputModel = req.body
    const result= bmiInputModel.weight / ((bmiInputModel.height *bmiInputModel.height) / 10000)
    res.status(200).json({bmiResult:result})
    bmiCalculationHistory.push({height:bmiInputModel.height, weight:bmiInputModel.weight, result:result})
})

webserver.get('/bmi/history',function(req, res){
    res.status(200).json(bmiCalculationHistory)
})

webserver.post('/user/login', function(req, res){
    if(req.body.userName!== null && req.body.userName === userDetails[0].userName && req.body.password === userDetails[0].password ){
        res.status(200).send(true)
    }
    else{
        res.status(200).send(false)
    }
})

webserver.post('/user/signUp', function(req, res){
    userDetails.push({userName:req.body.userName, password:req.body.password, email:req.body.email})
    res.status(200).json({registerMessage:"Successfully registered"})
})