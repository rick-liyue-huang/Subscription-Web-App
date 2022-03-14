import React from 'react';
import {BrowserRouter, Routes, Route,} from 'react-router-dom';
import './App.css';
import Nav from "./components/Nav";
import LandingPage from "./pages/Landing";
import Articles from "./pages/Articles";
import { ProtectedRoute } from './routes/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path={'/'} element={<LandingPage />} />
        <Route path={'/articles'} element={<ProtectedRoute />}>
          <Route path={'/articles'} element={<Articles />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
