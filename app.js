const express = require("express");
const app = express();
const https = require("https")
const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({extended: true}))
app.get("/" , function(req , res){
    res.sendFile(__dirname + "/index.html")


})
app.post("/" , function(req , res){
var place = req.body.city
const url = `https://api.openweathermap.org/data/2.5/weather?q=${place}&units=metric&appid=38b811255077b173fa7b994d1808b0d2`
https.get(url, function (response) {
    response.on("data", function (data) {
        const weatherData = JSON.parse(data)
        var wtemp = weatherData.main.temp
        var wDesp = weatherData.weather[0].description
        var icon = weatherData.weather[0].icon
        var image = `http://openweathermap.org/img/wn/${icon}@2x.png`
        res.send(`<h1>Temperature in ${place} is ${wtemp} degree celcius</h1>` + `<h2>weather desciption: ${wDesp}</h2>` + `<img src = ${image}>`)

    })

})
})







   




app.listen(3000, function () {
    console.log("server is running at port 3000")
})