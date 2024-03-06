import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
// import dotenv from 'dotenv';

// dotenv.config(); // Load environment variables


function App() {
    const [selectedCity, setSelectedCity] = useState('London')
    const [weatherInfo, setWeatherInfo] = useState({})
     const apiKey = process.env.VITE_REACT_WEATHER_API_KEY='c9697eeffc3f5659c896c58bfec3a716'
     console.log('API Key:', apiKey); 


    const handleCityChange = (event) => {
        setSelectedCity(event.target.value)
    }
    const cities = [
        'London',
        'New York',
        'Tokyo'
    ];

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const url = `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&appid=${apiKey}&units=metric`
                const response = await axios.get(url);
                const newWeatherInfo = {
                    temperature: response.data.main.temp,
                    description: response.data.weather[0].description,
                    icon: response.data.weather[0].icon,
                };
                console.log(newWeatherInfo)
                setWeatherInfo(newWeatherInfo)
            } catch (error) {
                console.error("Error fetching weather data:", error)//handle error by setting an error state or display an error message
            }
        }
        fetchWeather()
    }, [selectedCity, apiKey])


    return (
        <div>
            <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
                {cities.map((city) => (
                    <option key={city} value={city}>
                        {city}
                    </option>
                ))}
            </select>

            {weatherInfo ? (
                <div>
                    <h2>{selectedCity}</h2>
                    <p>Temperature: {weatherInfo.temperature}°C</p>

                </div>
            ) : (
                <p>Loading weather data...</p>
            )}
        </div>
    );
}

export default App;
