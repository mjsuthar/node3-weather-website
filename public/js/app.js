

var weatherForm = document.querySelector('form');
var search = document.querySelector('input');
var msgOne = document.querySelector("#msg-1");
var msgTwo = document.querySelector('#msg-2');



weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault();

    var city = search.value;
    
    msgOne.textContent = "Loading..."
    msgTwo.textContent = ""

    //console.log("City :- "+city)
    fetch("/weather?address="+city).then((response)=>{
        //console.log(response)
        response.json().then((data)=>{
            //console.log(data);
            if(data.error)
            {
                msgOne.textContent = "Error : "+data.error
                msgTwo.textContent = ""
                //console.log("Error :- "+data.error);
            }
            else{
                msgOne.textContent = "Location : "+data.location
                msgTwo.textContent = "Summary : "+data.weather

                //console.log("Weather :- "+data.weather);
                //console.log("Location :- "+data.location)
            }
        })

    })

});