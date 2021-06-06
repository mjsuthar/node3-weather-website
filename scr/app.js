const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geo = require("./Utils/geocode");
const weather = require("./Utils/weather");


const app = express();
const port = process.env.PORT || 3000

const filePath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../temp1/views");
const partialPath = path.join(__dirname,"../temp1/partials");

app.set("view engine", "hbs");
app.set("views", viewPath);
//console.log(partialPath)
hbs.registerPartials(partialPath);

app.use(express.static(filePath))

app.get("", (req, res)=>{
    res.render("index", {
        title:"Weather App",
        name:"Manoj"
    })
})

app.get("/about", (req, res)=>{
    res.render("about", {
        title:"About me",
        name:"kitty"
    })
})

app.get("/help", (req, res)=>{
    res.render("help", {
        title:"Help",
        name:"Manoj"
    })
})

app.get("/help/*", (req, res)=>{
    res.render('404', {
        title:"404",
        name:"Unknown",
        errorMsg:"help article not found"
    })
})

app.get("/weather", (req, res)=>{
    
    const Address = req.query.address;

    if(!Address)
    {
        return res.send({
            error:"Please enter valid Address!"
        })
    }

    geo(Address, (error, data = {})=>{
        if(error)
        {
            return res.send({ error })
        }

        if(data)
        {
            weather(data.lat, data.long, (error, response)=>{

                if(error)
                {
                    return res.send({ error })
                }

                if(response)
                {
                    res.send({
                        weather: response,
                        location:data.place
                        
                    })
                }
            })
        }

    })


})

app.get("*", (req, res)=>{
    res.render('404', {
        title:"404",
        name:"Unknown",
        errorMsg:"Can not found the page"
    })
})

app.listen(port, ()=>{
    console.log("Server Port "+port+" is running")
});