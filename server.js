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


webserver.post('/bmi/calculate',function(req, res){
    const bmiInputModel = req.body
    console.log("bmiInputModel",bmiInputModel)
    const result= bmiInputModel.weight / ((bmiInputModel.height *bmiInputModel.height) / 10000)
    res.status(200).json({bmiResult:result})
    bmiCalculationHistory.push({height:bmiInputModel.height, weight:bmiInputModel.weight, result:result})
})

webserver.get('/bmi/history',function(req, res){
    res.status(200).json(bmiCalculationHistory)
})

