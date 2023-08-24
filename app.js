const express= require("express");

const https = require("https");
const bodyparser= require("body-parser")

const app= express();

app.use(bodyparser.urlencoded({extended: true}));


app.get("/", function(req , res){

    res.sendFile(__dirname + "/index.html");

   

   
} );

app.post("/" , function(req , res){


const cityrecived = req.body.cityname;

const query=cityrecived;

const url= "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=metric&appid=e8cbc8a413117eb32e3b5f90f2a3232d";


https.get(url, function(response){

      

    response.on("data", function(data){

       
        const weatherData = JSON.parse(data)

        const temp = weatherData.main.temp
        const description =weatherData.weather[0].description
        const icon = weatherData.weather[0].icon
        const imageurl = "https://openweathermap.org/img/wn/" +   icon  + "@2x.png"

        res.write(" <h1>The temperature in "+ query   + " is "+ temp + " degree celcius </h1>");
        res.write("<h3>The weather is currently " + description + "</h3>");
        res.write("<img src="+imageurl+">")
        res.send()

    })
})


})






app.listen(3000, function(){

    console.log("server is running at port 3000");
})