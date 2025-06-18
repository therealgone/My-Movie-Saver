import MovieCard from "../componstes/MovieCard";
import { useState, useEffect } from "react";
import { getSearchMovie, getPopularMovies } from "../services/api";

function Home() {
  const [Search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setloading] = useState(true);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const PopularMovies = await getPopularMovies();
        setMovies(PopularMovies);
      } catch (err) {
        setError("Failed to fetch movies");
      } finally {
        setloading(false);
      }
    };
    fetchMovies();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if(!Search.trim()) {
      setError("No Movie Found");
      return;
    }
    setSearching(true);
    const fetchSearchResults = async () => {
        try {
            const SearchMovie = await getSearchMovie(Search);
            setMovies(SearchMovie);
        } catch (err) {
            setError("Failed to fetch search results");
        } finally {
            setSearching(false);
        }
    };
    fetchSearchResults();
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center px-4 py-8">
      <div className="flex flex-col items-center justify-center w-full max-w-2xl">
        <h1 className="text-5xl sm:text-6xl font-extrabold mb-4 drop-shadow-glow text-white text-center">Welcome to React - Movie</h1>
        <p className="text-lg sm:text-xl mb-8 text-white/80 drop-shadow-glow text-center">Find your favorite movies instantly.</p>
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-center gap-4 mb-8 w-full">
          <input
            type="text"
            placeholder="Search for a movie"
            className="rounded-lg p-3 w-full bg-gray-900 text-white placeholder-gray-400 border-2 border-gray-700 focus:border-pink-400 outline-none drop-shadow-glow"
            value={Search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            type="submit"
            className="bg-pink-500 text-white p-3 rounded-lg shadow-glow font-bold hover:bg-pink-600 transition-all drop-shadow-glow"
          >
            Search
          </button>
        </form>
        {error && <div className="mb-4 text-pink-400 drop-shadow-glow text-lg">{error}</div>}
      </div>
      <div className="w-full max-w-7xl mt-8">
        <h2 className="text-3xl font-bold mb-6 drop-shadow-glow text-white text-center">Popular Movies</h2>
        {loading || searching ? (
          <div className="text-white/80 drop-shadow-glow text-xl text-center">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full">
            {movies.map((movie) => (
              <MovieCard movie={movie} key={movie.id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
export default Home;
