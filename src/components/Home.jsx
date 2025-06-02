// src/components/Home.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'; // We will create this CSS file next

const Home = () => {
    const navigate = useNavigate();

    const handleYesClick = () => {
        navigate('/weather');
    };

    const handleNoClick = () => {
        window.location.reload();
    };

    return (
        <div className="home-container">
            <div className="home-content">
                <h1 className="home-title">
                    Do you want to use <span className="app-name">Ray's Weather App</span>?
                </h1>
                <div className="home-buttons">
                    <button className="home-button no" onClick={handleNoClick}>
                        Nah, not right now
                    </button>
                    <button className="home-button yes" onClick={handleYesClick}>
                        Yes, I do!
                    </button>
                </div>
            </div>
            <footer className="home-footer">
                <p>A cool weather app by Ray</p>
            </footer>
        </div>
    );
};

export default Home;