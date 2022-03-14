import React from 'react';
import {BrowserRouter, Routes, Route,} from 'react-router-dom';
import './App.css';
import Nav from "./components/Nav";
import LandingPage from "./pages/Landing";

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
