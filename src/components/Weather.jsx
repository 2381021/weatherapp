import React, { useEffect, useRef, useState } from 'react';
import './Weather.css';
import search_icon from '../assets/search.png'; // Assuming this path is now correct
import clear_icon from '../assets/clear.png';
import cloud_icon from '../assets/cloud.png';
import drizzle_icon from '../assets/drizzle.png';
import humidity_icon from '../assets/humidity.png';
import rain_icon from '../assets/rain.png';
import snow_icon from '../assets/snow.png';
import wind_icon from '../assets/wind.png';

const Weather = () => {
    const inputRef = useRef();
    const [weatherData, setWeatherData] = useState(null); // Changed initial state to null

    const allIcons = {
        "01d": clear_icon,
        "01n": clear_icon,
        "02d": cloud_icon,
        "02n": cloud_icon,
        "03d": cloud_icon,
        "03n": cloud_icon,
        "04d": drizzle_icon,
        "04n": drizzle_icon,
        "09d": rain_icon,
        "09n": rain_icon,
        "10d": rain_icon,
        "10n": rain_icon,
        "13d": snow_icon,
        "13n": snow_icon,
    };

    const search = async (city) => {
        if (!city || city.trim() === "") { // Check for empty or whitespace-only city
            alert("Enter city name");
            return;
        }
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;

            const response = await fetch(url);
            const data = await response.json();

            if (!response.ok) {
                alert(data.message || "City not found or API error."); // More robust error
                setWeatherData(null); // Clear data on error
                return;
            }

            console.log(data);
            // Defensive check for weather data and icon
            const iconCode = data.weather && data.weather[0] ? data.weather[0].icon : "01d";
            const icon = allIcons[iconCode] || clear_icon;

            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon,
            });
        } catch (error) {
            setWeatherData(null); // Clear data on error
            console.error("Error in fetching weather data:", error); // Log the actual error
            alert("An error occurred while fetching weather data. Please try again.");
        }
    };

    useEffect(() => {
        search("New York");
    }, []); // Empty dependency array: runs once on mount

    return (
        <div className='weather'>
            <div className="search-bar">
                <input
                    ref={inputRef}
                    type="text"
                    placeholder='Search'
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            search(inputRef.current.value);
                        }
                    }}
                />
                <img
                    src={search_icon}
                    alt="Search Icon" // Added alt text
                    onClick={() => search(inputRef.current.value)}
                />
            </div>

            {/* Conditional rendering for loading/error/data states */}
            {!weatherData && <p>Loading weather for New York or enter a city...</p>} 
            {/* You might want a more sophisticated loading/error state later */}

            {weatherData && (
                <>
                    <img src={weatherData.icon} alt="Weather condition icon" className='weather-icon' />
                    <p className='temperature'>{weatherData.temperature}°C</p>
                    <p className='location'>{weatherData.location}</p>
                    <div className="weather-data">
                        {/* Column 1: Humidity */}
                        <div className="col">
                            <img src={humidity_icon} alt="Humidity icon" />
                            <div>
                                <p>{weatherData.humidity}%</p> {/* Added % unit */}
                                <span>Humidity</span>
                            </div>
                        </div>
                        {/* Column 2: Wind Speed - This was nested incorrectly before, fixing it */}
                        <div className="col">
                            <img src={wind_icon} alt="Wind speed icon" />
                            <div>
                                <p>{weatherData.windSpeed} Km/h</p>
                                <span>Wind Speed</span>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Weather;