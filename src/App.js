import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

import Home from './Components/Home';

import Register from './Components/Register';
import Gestion from './Components/Gestion';

import CustomNavbar from './Components/Navbar';


import './Assets/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <AuthProvider>
    <Router>
    <CustomNavbar />
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/gestion" element={<Gestion />} />
        
      </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;
