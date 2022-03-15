import React from 'react';
import {BrowserRouter, Routes, Route,} from 'react-router-dom';
import './App.css';
import Nav from "./components/Nav";
import LandingPage from "./pages/Landing";
import Articles from "./pages/Articles";
import { ProtectedRoute } from './routes/ProtectedRoute';
import SubscriptPlan from "./pages/SubscriptPlan";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path={'/'} element={<LandingPage />} />
        <Route path={'/articles'} element={<ProtectedRoute />}>
          <Route path={'/articles'} element={<Articles />} />
        </Route>
        <Route path={'/subscriptplan'} element={<ProtectedRoute />}>
          <Route path={'/subscriptplan'} element={<SubscriptPlan />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
