const express = require("express")
const bodyParser = require("body-parser")
const https = require("https")
const res = require("express/lib/response")
const e = require("express")
    

const app = express()
app.use(bodyParser.urlencoded({extended:true}))

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', __dirname);
app.use(express.static(__dirname + '/public'));




app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html")
})

app.post("/",(req,res)=>{
    const cName = req.body.cityName
    const unit = "metric"
    const apiKey = "82f55ea54fadd2fe445dfb1bbdb84ab1"
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+cName+"&units="+unit+"&appid="+apiKey

    https.get(url,(response)=>{
        console.log(response.statusCode)
        response.on('data',(d)=>{
            const weatherData = JSON.parse(d)
            const temp = weatherData.main.temp
            const icon = weatherData.weather[0].icon
            const desc = weatherData.weather[0].description
            const date = new Date();
            const weekday = date.getDay();
            const day = date.getDate();
            const monthnum = date.getMonth();
            var week
            var month

            if(weekday == 0){
                 week = "Sunday"
            }else if(weekday == 1){
                 week = "Monday"
            }else if(weekday == 2){
                 week = "Tuesday"
            }else if(weekday == 3){
                 week = "Wednesday"
            }else if(weekday == 4){
                 week = "Thursday"
            }else if(weekday == 5){
                 week = "Friday"
            }else if(weekday == 6){
                 week = "Saturday"
            }


            if(monthnum == 0){
                 month = "January"
            }else if(monthnum == 1){
                 month = "February"
            }else if(monthnum == 2){
                 month = "March"
            }else if(monthnum == 3){
                 month = "April"
            }else if(monthnum == 4){
                 month = "May"
            }else if(monthnum == 5){
                 month = "June"
            }else if(monthnum == 6){
                 month = "July"
            }else if(monthnum == 7){
                 month = "August"
            }else if(monthnum == 8){
                 month = "September"
            }else if(monthnum == 9){
                 month = "October"
            }else if(monthnum == 10){
                 month = "November"
            }else if(monthnum == 11){
                 month = "December"
            }
            res.render(__dirname + "/weather.html", {temp:temp,desc:desc,day:day,month:month,week:week,city:cName});

            // const imgUrl ="http://openweathermap.org/img/wn/"+icon+"@2x.png"
            // res.write("<h1>"+cName+" :"+temp+" celsius"+"</h1>")
            // res.write("DESC :"+desc)
            // res.write("<img src="+imgUrl+">")
            // res.send()
            
        })
    })
})
   





app.listen(3000,()=>{
    console.log("server is running at port 3000");
})