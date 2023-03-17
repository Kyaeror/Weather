const APIKey = "8b47a2778fecabccd23cc155ce9bf82f"
const searchBtn = document.getElementById(`search-btn`)
const cityName = document.getElementById(`city-name`)
const currentIcon = document.getElementById(`current-icon`)
const currentCity = document.getElementById(`current-city`)
const currentTemp = document.getElementById(`current-temp`)
const currentWind = document.getElementById(`current-wind`)
const currentHumidity = document.getElementById(`current-humidity`)

searchBtn.addEventListener(`click` , () => {
    //grabbing location information
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName.value}&limit=1&appid=${APIKey}`)
    .then(response => response.json())
    .then(function (data) { 
        //current weather
        fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${data[0].lat}&lon=${data[0].lon}&appid=${APIKey}&units=metric`)
        .then(response => response.json())
        //writes inner html could have done this better like i did the forecast one
        .then(function (data){
            currentIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
            currentCity.innerHTML = `${data.name} (${moment().format('L')})`
            currentTemp.innerHTML = `Temp: ${data.main.temp} C`
            currentWind.innerHTML = `Wind: ${data.wind.speed} MPH`
            currentHumidity.innerHTML = `Humidity: ${data.main.humidity} %`
            console.log(data)
        })
        //forecast weather
        fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${data[0].lat}&lon=${data[0].lon}&appid=${APIKey}&units=metric`)
        .then(response => response.json())
        .then(function (data){
            for(i=1; i < 6; i++){
                // multiples of 8 because 24 hours / 3 hours = 8 in the array
                document.getElementById(`card-${i}`).innerHTML = `
                <p>${moment().add(i, 'days').format(`L`)}</p>
                <img src="https://openweathermap.org/img/wn/${data.list[(i-1)*8].weather[0].icon}@2x.png">
                <p>Temp: ${data.list[(i-1)*8].main.temp} C</p>
                <p>Wind: ${data.list[(i-1)*8].wind.speed} MPH</p>
                <p>Humidity: ${data.list[(i-1)*8].main.humidity} %</p>
                `
            }
             console.log(data)
        })
    }
        )
})