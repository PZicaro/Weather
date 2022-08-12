let input = document.querySelector(".insert-text");
let button = document.querySelector("button");
let image = document.querySelector(".icon");
let textDescription = document.querySelector(".climate-description");
let cityName = document.querySelector(".city");
let Celsius = document.querySelector(".degrees-text");
let currentData= document.querySelector(".current-data");

button.addEventListener("click",  async function ButtonCity(){
    input.classList.remove("error");
    let inputValue = input.value;
    if(inputValue==""){
        input.classList.add("error");
    }else{
  

       coordinatesParameter = await geocoding(inputValue);
       weatherResult = await weather(coordinatesParameter.lat, coordinatesParameter.lon);
       let iconCode= weatherResult["weather"]["0"]["icon"];
       let descriptionAPI= weatherResult["weather"]["0"]["description"];
       let city = weatherResult["name"];
       let temp= weatherResult["main"]["temp"];
       changeDom(iconCode, descriptionAPI, city, temp);

    }
    
    input.value="";
})

let geocoding =async (input)=>{
    let dataCordinate = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${input},BRA&&appid=ed69ec55ef9f0df9319bf98d98b7778a`);
    let dataCordinateJSON = await dataCordinate.json();
    return dataCordinateJSON[0];
}
async function weather(lat, lon){
    let dataWeather = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=pt_br&appid=ed69ec55ef9f0df9319bf98d98b7778a`);
    let dataWeatherJSON = await dataWeather.json();
    console.log(dataWeatherJSON );
    return dataWeatherJSON;
}

function changeDom(iconCode,description, city,temp){
    iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;
    image.src = iconUrl;
    textDescription.innerText = description;
    cityName.innerText= city;
    console.log(Celsius);
    Celsius.innerText= `${temp.toFixed(1)}°`;
    const data =new Date();
    const dia = String(data.getDate()).padStart(2,'0');
    const mes = String(data.getMonth() +1).padStart(2,'0');
    const ano = data.getFullYear();
    currentData.innerText= `${dia}/${mes}/${ano}`;
}