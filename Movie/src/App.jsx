import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./index.css";
import MovieCard from "./componstes/MovieCard.jsx";
import Home from "./pages/Home.jsx";
import { Routes, Route } from "react-router-dom";
import Fav from "./pages/Fav.jsx";
import Navbar from "./componstes/NavBar.jsx";

function App() {
  const movieNumber = 1;

  return (
    <div className="text-white bg-gray-700 min-h-screen flex flex-col items-center justify-center">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Fav" element={<Fav />} />
      </Routes>
    </div>
  );
}

export default App;
