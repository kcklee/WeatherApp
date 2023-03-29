let weather = {
    apiKey: "f5bd18702b0ec1de0e7a7da936be4a81",
    fetchWeather: function(city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q="
        + city
        + "&units=metric&appid="
        + this.apiKey)
        .then((response) => response.json())
        .then((data) => this.displayWeather(data));
    },

    displayWeather: function(data) {
       const { name } =  data;
       const { icon, description } = data.weather[0];
       // weather is an array (cause of the [] but only one element in array
       // that contains all the details (so just do 0))
       const { temp, humidity } = data.main;
       // so taking temp, humidity from the main object (objects have {} around them)
       const { speed } = data.wind;
       document.querySelector(".city").innerText = "Weather in " + name;
       // queryselector return first element that has the city class
       // ie look at the div classes in html that has city class (has to match
       // what's in the div classes in this case)
       // the period before city means it is a class 
       // innerText returns just the text in city class
       // and then when do = , setting that text to now be "Weather in " + name
       // instead of just the city name 
       // so this will change what shows up in the html 

       document.querySelector(".icon").src = "http://openweathermap.org/img/wn/" + icon + ".png";
       document.querySelector(".description").innerText = description;
       document.querySelector(".temp").innerText = temp + "°C";
       document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
       document.querySelector(".wind").innerText = "Wind speed: " + speed + " km/h";
       document.querySelector(".weather").classList.remove("loading");
       //so removing "loading" from the div class = weather.loading
       // so that the visibility css for .weather.loading no longer applies
       // to the weather (ie so weather is no longer hidden) 

       // so background pic is from city
       document.body.style.backgroundImage = "url('https://source.unsplash.com/random?" + name + "')"
    }, 

    search : function() {
        this.fetchWeather(document.querySelector(".search-bar").value)
        // .value --> return value in search bar (ie a city)
        // an then pass into fetchWeather
        // ie so you can find weather for typed in city
    }
}

document.querySelector(".search button").addEventListener("click", function() {
    weather.search();
    // .search button cause in div search and want the button in div search

})

document.querySelector(".search-bar").addEventListener("keyup", function() {
    if  (event.key == "Enter") {
        weather.search();
    }
})


