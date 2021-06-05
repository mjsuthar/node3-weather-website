const fetch = require('request');

const geocode = (address, callback) =>{
    const geoURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token=pk.eyJ1IjoibWpzdXRoYXIiLCJhIjoiY2tveDF1M2d6MDRpNjJybWMzdGJ1MTFrZSJ9.1kqty9ui0yYomx1lglVafA"

    fetch({url:geoURL, json:true}, (error, resp)=>{
        
        //console.log(resp.body.features)
        if(error)
        {
            callback("unable to connect to weather service!", undefined)
        }
        else if(resp.body.features.length === 0)
        {
             callback("unable to find location!", undefined)
        }
        else
        {
            const lat = resp.body.features[0].center[1];
            const log = resp.body.features[0].center[0];
            const placeName = resp.body.features[0].place_name;

            callback(undefined, {lat:lat, long:log, place:placeName});
        }
    });

}

module.exports = geocode