import React, { useState, useEffect } from 'react';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();


function WeatherInfo() {
    const [selectedCity, setSelectedCity] = useState('London');
    const [weatherInfo, setWeatherInfo] = useState(null);
    const apiKey = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;

    const cities = [
        'London',
        'New York',
        'Tokyo'
    ];

    useEffect(() => {
        const fetchWeather = async () => {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&appid=${apiKey}&units=metric`;
            const response = await axios.get(url);
            setWeatherInfo({
                temperature: response.data.main.temp,
                description: response.data.weather[0].description,
                icon: response.data.weather[0].icon,
            });


            fetchWeather();
        }, [selectedCity, apiKey]);

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
                    <h2>{weatherData.name}</h2>
                    <p>Temperature: {weatherData.main.temp} °C</p>
                    {/* might add more weather information as needed */}
                </div>
            ) : (
                <p>Loading weather data...</p>
            )}
        </div>
    );
}

export default WeatherInfo;
