import React, { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'
import dotenv from 'dotenv'
dotenv.config()

function App() {
    const [selectedCity, setSelectedCity] = useState('London')
    const [weatherInfo, setWeatherInfo] = useState({}); // Initialize as an empty object or should it be an empty array?
    const apiKey = process.env.VITE_REACT_APP_OPENWEATHERMAP_API_KEY
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
            setWeatherInfo({
                temperature: response.data.main.temp,
                description: response.data.weather[0].description,
                icon: response.data.weather[0].icon,
            });
        } catch (error) {
            console.error("Error fetching weather data:",error)//handle error by setting and error state or display an error message
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

            {weatherData ? (
                <div>
                    <h2>{weatherInfo.name}</h2>
                    <p>Temperature: {weatherInfo.main.temp} °C</p>
                    {/* might add more weather information as needed */}
                </div>
            ) : (
                <p>Loading weather data...</p>
            )}
        </div>
    );
}

export default App;
