import React, { useEffect, useRef, useState } from 'react';
import './Weather.css';
import search_icon from '../assets/search.png';
import clear_icon from '../assets/clear.png';
import cloud_icon from '../assets/cloud.png';
import drizzle_icon from '../assets/drizzle.png';
import humidity_icon from '../assets/humidity.png';
import rain_icon from '../assets/rain.png';
import snow_icon from '../assets/snow.png';
import wind_icon from '../assets/wind.png';

const Weather = () => {
    const inputRef = useRef();
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true); // Added for loading state
    const [error, setError] = useState(null); // Added for error state

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
        if (!city || city.trim() === "") {
            alert("Enter city name");
            return;
        }
        setLoading(true); // Set loading true at the start of search
        setError(null);   // Clear previous errors
        // setWeatherData(null); // Optionally clear previous data immediately

        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
            const response = await fetch(url);
            const data = await response.json();

            if (!response.ok) {
                setError(data.message || "City not found or API error.");
                setWeatherData(null);
                setLoading(false); // Set loading false on error
                return;
            }

            const iconCode = data.weather && data.weather[0] ? data.weather[0].icon : "01d";
            const icon = allIcons[iconCode] || clear_icon;

            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon,
            });
        } catch (err) { // Catch specific error object
            setError("An error occurred while fetching weather data. Please try again.");
            setWeatherData(null);
            console.error("Error in fetching weather data:", err);
        } finally {
            setLoading(false); // Set loading false when search is complete (success or caught error)
        }
    };

    useEffect(() => {
        search("New York"); // Initial search
    }, []);

    return (
        <div className='weather'>
            <div className="search-bar">
                <input
                    ref={inputRef}
                    type="text"
                    placeholder='Search City' // Changed placeholder
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            search(inputRef.current.value);
                        }
                    }}
                />
                <img
                    src={search_icon}
                    alt="Search Icon"
                    className="search-button-icon" // Added class for specific styling/animation
                    onClick={() => search(inputRef.current.value)}
                />
            </div>

            {loading && <p className='status-message'>Loading weather data...</p>}
            {error && <p className='status-message error-message'>{error}</p>}

            {!loading && !error && weatherData && (
                <div className="weather-content-animate"> {/* Wrapper for animating content entry */}
                    <img src={weatherData.icon} alt="Weather condition icon" className='weather-icon' />
                    <p className='temperature'>{weatherData.temperature}°C</p>
                    <p className='location'>{weatherData.location}</p>
                    <div className="weather-data">
                        <div className="col">
                            <img src={humidity_icon} alt="Humidity icon" />
                            <div>
                                <p>{weatherData.humidity}%</p>
                                <span>Humidity</span>
                            </div>
                        </div>
                        <div className="col">
                            <img src={wind_icon} alt="Wind speed icon" />
                            <div>
                                <p>{weatherData.windSpeed} Km/h</p>
                                <span>Wind Speed</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/* Message if no data is available and not loading/error */}
            {!loading && !error && !weatherData && (
                <p className='status-message'>No weather data to display. Try searching for a city.</p>
            )}
        </div>
    );
};

export default Weather;