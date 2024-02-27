//import statements
import './Weather.css';
import React, { useState } from 'react'
import search_icon from "./Assets/search.png";
import clear_icon from "./Assets/clear.png";
import cloud_icon from "./Assets/cloud.png";
import drizzle_icon from "./Assets/drizzle.png";
import rain_icon from "./Assets/rain.png";
import snow_icon from "./Assets/snow.png";
import wind_icon from "./Assets/wind.png";
import humidity_icon from "./Assets/humidity.png"; 


//functional components
const Weatherapp = () => {
  //api key from Openweathermap
  let api_key = "88e9e5c2353f1e4e75b906fc5d7d165f";
  const[icon,setIcon] = useState(cloud_icon);
  const [errorMessage, setErrorMessage] = useState('');
  const [weatherData, setWeatherData] = useState({
    humidity: '74%',
    windSpeed: '4.26 Km/h',
    temperature: '27°C',
    location: 'Chennai',
  });
  
  // it triggered  when you click the search icon
  const Search = async ()=>{
     // Retrieving the city name input element
    const cityName = document.getElementsByClassName("cityInput");

    // Handling the case where the input is empty
    if(cityName[0].value===" "){
       // Update state variables for displaying an error message
      setWeatherData({
        humidity: '0%',
        windSpeed: '0 km/h',
        temperature: '0 °C',
        location: '',
      });
      return 0;
    }
    try{
        // Fetching weather data from the OpenWeatherMap API
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName[0].value}&units=Metric&appid=${api_key}`;

    let response = await fetch(url);
       // Handling the case where the response is not successful
    if (!response.ok) {
      throw new Error('City not found');
    }
       // Clearing the error message
      setErrorMessage(' ')
    

     // Processing the received data and updating state variables
    let data = await response.json();
    const humidity = document.getElementsByClassName("humidity-percent");
    const wind = document.getElementsByClassName("wind-speed");
    const temperature = document.getElementsByClassName("weather-temp");
    const location = document.getElementsByClassName("weather-location");

    humidity[0].innerHTML = data.main.humidity+ " %";
    wind[0].innerHTML = data.wind.speed+ " km/h";
    temperature[0].innerHTML = Math.floor(data.main.temp)+ " °C";
    location[0].innerHTML = data.name;

     // Updating the weather icon based on weather conditions
    if(data.weather[0].icon==="01d" || data.weather[0].icon==="01n"){
      setIcon(clear_icon);
    }else if(data.weather[0].icon==="02d" || data.weather[0].icon==="02n"){
      setIcon(cloud_icon);
    }else if(data.weather[0].icon==="03d" || data.weather[0].icon==="03n"){
      setIcon(drizzle_icon);
    }else if(data.weather[0].icon==="04d" || data.weather[0].icon==="04n"){
      setIcon(drizzle_icon);
    }else if(data.weather[0].icon==="09d" || data.weather[0].icon==="09n"){
      setIcon(rain_icon);
    }else if(data.weather[0].icon==="10d" || data.weather[0].icon==="10n"){
      setIcon(rain_icon);
    }else if(data.weather[0].icon==="13d" || data.weather[0].icon==="13n"){
      setIcon(snow_icon);
    }else{
      setIcon(clear_icon)
    }
  } catch (error) {
    // Handling the case where city is not found
    setIcon(clear_icon);
    setWeatherData({
      humidity: '0%',
      windSpeed: '0 km/h',
      temperature: '0 °C',
      location: '',
    });
    setErrorMessage('City not found');
  }
};
  return (
    <div className='container'>
  <div className='top-bar'>
     <input type='text' className='cityInput' placeholder='Search'/>
     <div className='search-icon' onClick={()=>{Search()}}>
        <img src={search_icon} alt=''/>
     </div> 
  </div>
  <div className='weather-img'>
    <img src={icon} alt=''/>
  </div>   
  <div className='weather-temp'>{weatherData.temperature}</div> 
  <div className='weather-location'>{weatherData.location}</div>
  
  <div className='data-container'>
    <div className='element'>
        <img src ={humidity_icon} alt='' className='icon'/>
        <div className='data'>
            <div className='humidity-percent'>{weatherData.humidity}</div>
            <div className='text'>Humidity</div>

       </div>
    </div>
    <div className='element'>
        <img src ={wind_icon} alt='' className='icon'/>
        <div className='data'>
            <div className='wind-speed'>{weatherData.windSpeed}</div>
            <div className='text'>Wind Speed</div>

        </div>

    </div>


  </div>
  <div className='error-message'>{errorMessage}</div>
    </div>
  )
}

export default Weatherapp