const formEl = document.querySelector("form");
const inputField = document.getElementById("cityName");
const iconImg = document.querySelector("h4");
const cityName = document.querySelector("h1");
const cityTime = document.querySelector("h2");
const temperature = document.querySelector("h3:nth-of-type(1)");
const humidity = document.querySelector("h3:nth-of-type(2)");
const windSpeed = document.querySelector("h3:nth-of-type(3)");
const description = document.querySelector("p");
const apiKey = "******************************";

const  fetchData = async () => {

    try {
        // Temperatue in Celcius => units=metric
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputField.value}&appid=${apiKey}&units=metric`);

        const data = await res.json();

        let tempToCelcius = data.main["temp"];

        // Temperature in Fahrenheit  => units=imperial
        // const res = await fetch(
        //   `https://api.openweathermap.org/data/2.5/weather?q=${inputField.value}&appid=${apiKey}&units=imperial`
        // );

        // const data = await res.json();

        // let tempToFahrenheit = data.main["temp"];

        let icon = data.weather[0].icon;
        iconImg.innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="icon">`;

        const capitalizedCity = `${inputField.value.charAt(0).toUpperCase() + inputField.value.slice(1)}`;

        cityName.innerHTML = `${capitalizedCity}, ${data.sys["country"]}`;
        // cityTime.innerText = getLocalTime(capitalizedCity, "-3");
        temperature.innerHTML = `Temperature is ${Math.ceil(tempToCelcius)} C°`;
        humidity.innerHTML = `Humidity is ${data.main["humidity"]}%`;
        windSpeed.innerHTML = `Wind speed is ${data.wind["speed"]} km/h`;
        description.innerHTML = `${data.weather[0].description}`;
        
        inputField.value = "";
        inputField.focus();
    } 

    catch(error) {
        console.log(error)
    }

}

formEl.addEventListener("submit", (e) => {

    e.preventDefault();

    fetchData();
});

// const getLocalTime = (city, offset) => {
//     const date = new Date();
//     const utc = date.getTime() + (date.getTimezoneOffset() * 60000);
//     const localTime = new Date(utc + (3600000 * offset));
//     return `The local time in ${city} is ${localTime.toLocaleTimeString()}`
// }

