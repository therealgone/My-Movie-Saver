import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "../componstes/MovieCard";

function Fav() {
  const { Favorite } = useMovieContext();
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-t from-black to-zinc-800 px-4 py-8">
      <h1 className="text-4xl font-extrabold text-white drop-shadow-[0_0_10px_white] mb-8 text-center">Favorite Movies</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full max-w-7xl">
        {Favorite && Favorite.length > 0 ? (
          Favorite.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))
        ) : (
          <div className="col-span-full text-gray-400 drop-shadow-[0_0_6px_gray] text-xl text-center">No favorite movies yet.</div>
        )}
      </div>
    </div>
  );
}
export default Fav;
