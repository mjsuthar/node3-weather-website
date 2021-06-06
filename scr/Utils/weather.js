const fetch = require('request');

const weather = (lat, long, callback) => {

    const url = "https://api.weatherbit.io/v2.0/forecast/daily?lat="+lat+"&lon="+long+"&key=0c0f0e8e9e40431ebca86360735838e8";

    fetch({url:url, json: true}, (error, resp) => {
        
        if(error)
         {
             callback("unable to connect!", undefined)
         }
         else if(resp.body.error)
         {
             callback("unable to find location!", undefined)
         }
         else
         {
            const temp = resp.body.data[0].temp;
            const rainChance = resp.body.data[0].precip;
            const summary = resp.body.data[0].weather.description;
            const highTemp = resp.body.data[0].max_temp;
            const lowTemp = resp.body.data[0].low_temp;
            
            callback(undefined , summary+". It is currently "+temp+" degree out. The high today is "+highTemp+" with low of "+lowTemp+". There is a "+rainChance.toFixed(2)+"% chances of rain.")
         }
        })
}

module.exports = weather;