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
    <div className="min-h-screen w-full bg-gradient-to-t from-black to-zinc-800 flex flex-col text-white drop-shadow-[0_0_10px_white]">
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
