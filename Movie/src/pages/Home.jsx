import MovieCard from "../componstes/MovieCard";
import { useState, useEffect } from "react";
import { getSearchMovie, getPopularMovies, getGenres, getMoviesByGenre } from "../services/api";

function Home() {
  const [Search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setloading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(0);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const genreList = await getGenres();
        setGenres(genreList);
      } catch (err) {
        // ignore genre errors for now
      }
    };
    fetchGenres();
  }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      setloading(true);
      try {
        if (selectedGenre && selectedGenre !== 0) {
          const genreMovies = await getMoviesByGenre(selectedGenre);
          setMovies(genreMovies);
        } else {
          const PopularMovies = await getPopularMovies();
          setMovies(PopularMovies);
        }
      } catch (err) {
        setError("Failed to fetch movies");
      } finally {
        setloading(false);
      }
    };
    fetchMovies();
  }, [selectedGenre]);

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

  const handleGenreChange = (e) => {
    setSelectedGenre(Number(e.target.value));
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-t from-black to-zinc-800 px-4 py-8">
      <div className="flex flex-col items-center justify-center w-full max-w-2xl">
        <h1 className="text-5xl font-extrabold text-white drop-shadow-[0_0_10px_white] mb-4 text-center">Welcome to React - Movie</h1>
        <p className="text-2xl text-gray-400 drop-shadow-[0_0_6px_gray] mb-8 text-center">Find your favorite movies instantly.</p>
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-center gap-4 mb-8 w-full">
          <input
            type="text"
            placeholder="Search for a movie"
            className="bg-zinc-800 text-white rounded px-4 py-2 focus:ring-2 focus:ring-white focus:shadow-[0_0_20px_white] placeholder:text-white w-full"
            value={Search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            type="submit"
            className="bg-zinc-800 text-white font-bold rounded-2xl shadow-[0_0_10px_white] px-6 py-2 transition hover:bg-white hover:text-black hover:scale-105"
          >
            Search
          </button>
        </form>
        {error && <div className="mb-4 text-pink-400 drop-shadow-[0_0_10px_white] text-lg text-center">{error}</div>}
      </div>
      {/* Genre Filter Dropdown */}
      <div className="w-full flex justify-center mb-6">
        <select
          value={selectedGenre}
          onChange={handleGenreChange}
          className="bg-zinc-800 text-white font-bold rounded-2xl shadow-[0_0_10px_white] px-6 py-2 transition focus:ring-2 focus:ring-white focus:shadow-[0_0_20px_white]"
        >
          <option value={0}>All Genres</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>{genre.name}</option>
          ))}
        </select>
      </div>
      <div className="w-full max-w-7xl mt-4">
        <h2 className="text-3xl font-bold text-white drop-shadow-[0_0_10px_white] mb-6 text-center">Popular Movies</h2>
        {loading || searching ? (
          <div className="text-white/80 drop-shadow-[0_0_6px_gray] text-xl text-center">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full max-w-7xl">
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
