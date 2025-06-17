import MovieCard from "../componstes/MovieCard";
import { useState, useEffect, use } from "react";
import { getSearchMovie, getPopularMovies } from "../services/api";

function Home() {
  const [Search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const PopularMovies = await getPopularMovies();
        console.log("Fetched Popular Movies:", PopularMovies);
        setMovies(PopularMovies);
      } catch (err) {
        console.log(err);
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
    const fetchSearchResults = async () => {
        try {
            const SearchMovie = await getSearchMovie(Search);
            setMovies(SearchMovie);
        } catch (err) {
            console.log(err);
            setError("Failed to fetch search results");
        }
    };
    fetchSearchResults();
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for a movie"
          className="border border-gray-300 rounded p-2"
          value={Search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded ml-2"
        >
          Search
        </button>
      </form>
{error && <div>{error}</div>}

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      )}
    </div>
  );
}
export default Home;
