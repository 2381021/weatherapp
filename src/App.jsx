// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';         // Import Home component
import Weather from './components/Weather';   // Assuming Weather is also in components
// If Weather.jsx is directly in src/, use: import Weather from './Weather';

// You might have a global App.css if you want to style the 'app' div
// import './App.css'; 

const App = () => {
  return (
    <BrowserRouter>
      {/* The div with className 'app' can remain if you use it for global styling,
          otherwise, it's not strictly necessary for the router itself. */}
      <div className='app'> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/weather" element={<Weather />} />
          <Route path="*" element={<Navigate to="/" replace />} /> {/* Redirect unknown paths */}
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;