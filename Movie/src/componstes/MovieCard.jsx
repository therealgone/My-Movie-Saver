import { useMovieContext } from "../contexts/MovieContext";

function MovieCard({ movie }) {
  const { addToFavorite, removeFromFavorite, isFavorite } = useMovieContext();
  const isFav = isFavorite(movie.id);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    if (isFav) removeFromFavorite(movie.id);
    else addToFavorite(movie);
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-xl shadow-2xl p-4 m-4 flex flex-col items-center border border-gray-700/60 hover:shadow-glow transition-all duration-300">
      <div className="relative w-full flex justify-center">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="rounded-lg w-full max-w-xs shadow-lg border-2 border-gray-700/40"
        />
        <button
          onClick={handleFavoriteClick}
          className={`absolute top-2 right-2 text-3xl transition-all duration-200 focus:outline-none ${isFav ? "text-pink-500 drop-shadow-glow animate-pulse" : "text-white/80 hover:text-pink-400"}`}
          title={isFav ? "Remove from Favorites" : "Add to Favorites"}
        >
          {isFav ? "❤️" : "♡"}
        </button>
      </div>
      <div className="mt-4 text-center">
        <h2 className="text-2xl font-bold text-white drop-shadow-glow mb-2">{movie.title}</h2>
        <p className="text-white/80 drop-shadow-glow">{movie.release_date}</p>
      </div>
    </div>
  );
}

export default MovieCard;