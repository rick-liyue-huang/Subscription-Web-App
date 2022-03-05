import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Nav from "./components/Nav";
import './App.css';
import LandingPage from "./pages/LandingPage";
import Articles from "./pages/Articles/Articles";
import {ProtectedRoute} from "./routes/ProtectedRoute";
import ArticlePlans from "./pages/Articles/ArticlePlans";


function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path={'/'} element={<LandingPage />} />
        <Route path={'/articles'} element={<ProtectedRoute />}>
          <Route path={'/articles'} element={<Articles />} />
        </Route>
        <Route path={'/articles-plans'} element={<ProtectedRoute />}>
          <Route path={'/articles-plans'} element={<ArticlePlans />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
