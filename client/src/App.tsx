import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Nav from "./components/Nav";
import './App.css';
import LandingPage from "./pages/LandingPage";


function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path={'/'} element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
