var input = document.getElementById("search-input");

input.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    getClimateInfo(event.target.value);
  }
});

function getClimateInfo(address){
    var location = document.getElementById('location');
    var country = document.getElementById('country');
    var temp = document.getElementById('temp');
    var tempImg = document.getElementById('tempImg');
    var today = document.getElementById('today');
    var days = document.getElementById('days');
    var windy = document.getElementById('windy');
    var humiditys = document.getElementById('humidity');
    var uv = document.getElementById('uv'); 
    var pressure = document.getElementById('pressure'); 
   

        fetch('http://api.weatherapi.com/v1/forecast.json?key=1c4a4eb9698a40ed92845813231402&q='+address+'&days=8&aqi=yes&alerts=yes')    
        .then(response => response.json())
        .then((data)=> {
                if(data && data.forecast){
                    location.innerHTML = data.location.name;
                    country.innerHTML = data.location.country;
                    temp.innerHTML = data.current.temp_c;
                    windy.innerHTML = data.current.wind_kph;
                    humidity.innerHTML = data.current.humidity;
                    uv.innerHTML = data.current.uv;
                    pressure.innerHTML = data.current.pressure_in;
                    

                    tempImg.setAttribute('src',`./image/${data.current.is_day === 0 ? 'night': 'day'}/${data.current.condition.code}.svg`)
                    let {forecastday} = data.forecast;
                    if(forecastday && forecastday.length > 0){
                        let currentDay = forecastday.shift();
                        let todayWeather = [6,9,12,15,18,21].map(time => {
                            let now = currentDay.hour[time];
                            return `
                            <div class="col-6 col-sm-4 col-md-4 col-lg-2 ">
                            <div class="d-grid text-center justify-content-center hour-card border-end">
                                <span class=" title-clr title">${moment(now.time, 'YYYY-MM-DD hh:mm').format('hh:mm A')}</span>
                                <img width="40" src="./image/${now.is_day === 0 ? 'night': 'day'}/${now.condition.code}.svg" alt="suncloud" />
                                <span class="fs-6 fw-bold">${now.temp_c}°C</span>
                            </div>
                        </div>
                            `
                        });
                        today.innerHTML = todayWeather.join('\n');
                        let dayWeathers=  forecastday.map((forecast, index) => {
                            return  `<div class="d-flex justify-content-between align-items-center p-4 ${index === forecastday.length -1 ? "": "border-bottom"}">
                               <div class="title-clr title">${moment(forecast.date).format('dddd')}</div>
                               <div class="flex-grow-1 d-flex gap-1 justify-content-center align-items-center">
                                       <img width="40" src="./image/day/${forecast.day.condition.code}.svg" alt="sun"/> <span class="title  fw-bold">Sunny </span>
                           </div>
                               <div class="title fw-semibold">${forecast.day.avgtemp_c}°C</div>
                           </div>` 
                        })
                        days.innerHTML = dayWeathers.join('\n');
                    }
                }
          })
}

navigator.geolocation.getCurrentPosition(loc=>{
    var location = document.getElementById('location');
    var country = document.getElementById('country');
    var temp = document.getElementById('temp');
    var tempImg = document.getElementById('tempImg');
    var today = document.getElementById('today');
    var days = document.getElementById('days');
    var windy = document.getElementById('windy');
    var humiditys = document.getElementById('humidity');
    var uv = document.getElementById('uv'); 
    var pressure = document.getElementById('pressure'); 
    fetch('http://api.weatherapi.com/v1/forecast.json?key=1c4a4eb9698a40ed92845813231402&q='+loc.coords.latitude+","+loc.coords.longitude+'&days=8&aqi=no&alerts=no')           //api for the get request
.then(response => response.json())
.then((data)=> {


    if(data && data.forecast){
        
        location.innerHTML = data.location.name;
        country.innerHTML = data.location.country;
        temp.innerHTML = data.current.temp_c;
        windy.innerHTML = data.current.wind_kph;
        humidity.innerHTML = data.current.humidity;
        uv.innerHTML = data.current.uv;
        pressure.innerHTML = data.current.pressure_in;
        

        tempImg.setAttribute('src',`./image/${data.current.is_day === 0 ? 'night': 'day'}/${data.current.condition.code}.svg`)
        let {forecastday} = data.forecast;
        if(forecastday && forecastday.length > 0){
            let currentDay = forecastday.shift();
            let todayWeather = [6,9,12,15,18,21].map(time => {
                let now = currentDay.hour[time];
                return `
                <div class="col-6 col-sm-4 col-md-4 col-lg-2 ">
                <div class="d-grid text-center justify-content-center hour-card border-end">
                    <span class=" title-clr title">${moment(now.time, 'YYYY-MM-DD hh:mm').format('hh:mm A')}</span>
                    <img width="40" src="./image/${now.is_day === 0 ? 'night': 'day'}/${now.condition.code}.svg" alt="suncloud" />
                    <span class="fs-6 fw-bold">${now.temp_c}°C</span>
                </div>
            </div>
                `
            });
            today.innerHTML = todayWeather.join('\n');
            let dayWeathers=  forecastday.map((forecast, index) => {
                return  `<div class="d-flex justify-content-between align-items-center p-4 ${index === forecastday.length -1 ? "": "border-bottom"}">
                   <div class="title-clr title">${moment(forecast.date).format('dddd')}</div>
                   <div class="flex-grow-1 d-flex gap-1 justify-content-center align-items-center">
                           <img width="40" src="./image/day/${forecast.day.condition.code}.svg" alt="sun"/> <span class="title  fw-bold">Sunny </span>
               </div>
                   <div class="title fw-semibold">${forecast.day.avgtemp_c}°C</div>
               </div>` 
            })
            days.innerHTML = dayWeathers.join('\n');
        }
    }
})
})









