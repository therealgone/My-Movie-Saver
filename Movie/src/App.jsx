import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./index.css";
import MovieCard from "./componstes/MovieCard.jsx";
import Home from "./pages/Home.jsx";
import { Routes, Route } from "react-router-dom";
import Fav from "./pages/Fav.jsx";
import { MovieProvider } from "./contexts/MovieContext.jsx";
import { getPopularMovies } from "./services/api.js";
import { getSearchMovie } from "./services/api.js";
import { useEffect } from "react";
import { useContext } from "react";
import { useMovieContext } from "./contexts/MovieContext.jsx";
import { createContext } from "react";
import { useRef } from "react";
import Navbar from "./componstes/NavBar.jsx";

function App() {
  const movieNumber = 1;

  return (
    <>
    <MovieProvider>
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-gray-800 to-black flex flex-col items-center justify-center text-white drop-shadow-glow">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Fav" element={<Fav />} />
      </Routes>
    </div>
      </MovieProvider>  
    </>          
  );
}

export default App;
