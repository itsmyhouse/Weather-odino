async function loadWeather (location) {
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=6b16a43e9bc49f7ff844c9b632ea4793`);

    response = await response.json();
    let data = processData(response);
    render(data);
}

function processData (response) {
    let {name, main, weather} = response;
    return {name, main, weather};
}

function render(obj) {
    const divWeather = document.querySelector("#weather");

    if(divWeather.hasChildNodes) {
        const children = divWeather.childNodes;
        for(let node of Array.from(children)) {
            divWeather.removeChild(node);
        }
    }
    
    const city = document.createElement("h1");
    const description = document.createElement("h2");
    const temperature = document.createElement("div");
    const toF = document.createElement("button");
    const toC = document.createElement("button");

    city.innerText = obj.name;
    description.innerText = obj.weather[0].description;
    temperature.innerText = kelvinToCelcius(obj.main.temp);
    toF.innerText = "change to F";
    toF.addEventListener("click", changeKtoF);
    toC.addEventListener("click", changeKtoC);
    toC.innerText = "change to C";

    divWeather.appendChild(city);
    divWeather.appendChild(description);
    divWeather.appendChild(temperature);
    divWeather.appendChild(toF);

    function changeKtoF() {
        const fahrenheit = KelvinToFahrenheit(obj.main.temp);

        divWeather.removeChild(temperature);
        divWeather.removeChild(toF);
        temperature.innerText = fahrenheit;
        divWeather.appendChild(temperature);
        divWeather.appendChild(toC);
    }

    function changeKtoC () {
        const celsius = kelvinToCelcius(obj.main.temp);

        divWeather.removeChild(temperature);
        divWeather.removeChild(toC);
        temperature.innerText = celsius;
        divWeather.appendChild(temperature);
        divWeather.appendChild(toF);
    }
}

function kelvinToCelcius (temperature) {
    let celsius = temperature - 273.15;
    celsius = celsius.toFixed(2);
    celsius = `${celsius} °C`
    return celsius;
}

function KelvinToFahrenheit(temperature) {
        let fahr = (temperature - 273.15) * 9/5 + 32;
        fahr = fahr.toFixed(2);
        fahr = `${fahr} °F`;
        return fahr;
}

const button = document.querySelector("button");
button.addEventListener("click", displayWeather);

function displayWeather (event) {
    const input = document.querySelector("[type=text]");
    loadWeather(input.value);
}
