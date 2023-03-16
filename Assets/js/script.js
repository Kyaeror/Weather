const APIKey = "8b47a2778fecabccd23cc155ce9bf82f"
const searchBtn = document.getElementById(`search-btn`)
const cityName = document.getElementById(`city-name`)

searchBtn.addEventListener(`click` , () => {
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName.value}&limit=1&appid=${APIKey}`)
    .then(response => response.json())
    .then(data => 
        fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${data[0].lat}&lon=${data[0].lon}&cnt=6&appid=${APIKey}`)
        .then(response => response.json())
        .then(data => console.log(data))
        )
})