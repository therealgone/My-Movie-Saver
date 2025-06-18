import { useMovieContext } from "../contexts/MovieContext";
import { useState } from "react";

function MovieCard({ movie }) {
  const { addToFavorite, removeFromFavorite, isFavorite } = useMovieContext();
  const isFav = isFavorite(movie.id);
  const [hovered, setHovered] = useState(false);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    if (isFav) removeFromFavorite(movie.id);
    else addToFavorite(movie);
  };

  return (
    <div
      className="bg-black rounded-2xl p-5 border border-zinc-700/60 flex flex-col items-center transition shadow-none hover:shadow-[0_0_10px_white] relative group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative w-full flex justify-center">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="rounded-xl mx-auto w-full max-w-xs border-4 border-zinc-700/40 mb-4"
        />
        <button
          onClick={handleFavoriteClick}
          className={`absolute top-2 right-2 bg-zinc-800 text-white text-2xl rounded-full px-3 py-1 transition focus:outline-none hover:bg-white hover:text-pink-500 ${isFav ? "text-pink-500 scale-110" : ""}`}
          title={isFav ? "Remove from Favorites" : "Add to Favorites"}
        >
          {isFav ? "❤️" : "♡"}
        </button>
      </div>
      <div className="mt-2 text-center w-full">
        <h2 className="text-white text-2xl font-bold drop-shadow-[0_0_10px_white] mb-2">{movie.title}</h2>
        <p className="text-gray-400 drop-shadow-[0_0_6px_gray]">{movie.release_date}</p>
      </div>
      {/* Overlay for description and rating on hover */}
      <div
        className={`absolute left-0 right-0 bottom-0 px-4 py-5 bg-black/90 rounded-b-2xl text-white text-center transition-all duration-300 ${hovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
        style={{ minHeight: '120px' }}
      >
        <div className="font-bold text-lg mb-2">{movie.title}</div>
        {movie.overview && <div className="text-sm text-gray-300 mb-2 line-clamp-3">{movie.overview}</div>}
        {movie.vote_average !== undefined && (
          <div className="text-yellow-400 font-bold">⭐ {movie.vote_average}</div>
        )}
      </div>
    </div>
  );
}

export default MovieCard;