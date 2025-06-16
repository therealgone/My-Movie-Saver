import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./index.css";
import MovieCard from "./componstes/MovieCard.jsx";

function App() {
  const movieNumber = 1;

  return (
    <div className="bg-black min-h-screen">
      {movieNumber === 1 ? (
        <MovieCard
          movie={{
            title: "Inception",
            description: "A mind-bending thriller",
            url: "https://example.com/inception.jpg",
          }}
        ></MovieCard>
      ) : (
        <MovieCard
          movie={{
            title: "movie 2",
            description: "A mind-bending thriller",
            url: "https://example.com/inception.jpg",
          }}
        ></MovieCard>
      )}
    </div>
  );
}

export default App;
