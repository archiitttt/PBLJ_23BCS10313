import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home'; 
import Login from './pages/Login';
import About from './pages/About'; 
import Fundraiser from './pages/Fundraiser';
import CampaignDetail from './pages/CampaignDetail';
import './App.css'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/fundraiser" element={<Fundraiser />} />
        <Route path="/campaigns/:id" element={<CampaignDetail />}/>
      </Routes>
    </Router>
  );
};

export default App;