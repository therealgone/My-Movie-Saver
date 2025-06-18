import MovieCard from "../componstes/MovieCard";
import { useState, useEffect } from "react";
import {
  getSearchMovie,
  getPopularMovies,
  getGenres,
  getMoviesByGenre,
  getTopRatedMovies,
  getNowPlayingMovies,
  getUpcomingMovies,
} from "../services/api";

const TABS = [
  { label: "Popular", value: "popular" },
  { label: "Top Rated", value: "top_rated" },
  { label: "Now Playing", value: "now_playing" },
  { label: "Upcoming", value: "upcoming" },
];

const SORT_OPTIONS = [
  { label: "Popularity", value: "popularity.desc" },
  { label: "Rating", value: "vote_average.desc" },
  { label: "Release Date (Newest)", value: "release_date.desc" },
  { label: "Release Date (Oldest)", value: "release_date.asc" },
  { label: "Title (A-Z)", value: "original_title.asc" },
  { label: "Title (Z-A)", value: "original_title.desc" },
];

function Home() {
  const [Search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setloading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(0);
  const [tab, setTab] = useState("popular");
  const [sortBy, setSortBy] = useState(SORT_OPTIONS[0].value);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch genres on mount
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const genreList = await getGenres();
        setGenres(genreList);
      } catch (err) {}
    };
    fetchGenres();
  }, []);

  // Fetch movies when tab, genre, sort, or page changes
  useEffect(() => {
    const fetchMovies = async () => {
      setloading(true);
      setError(null);
      try {
        let data;
        if (Search.trim()) {
          data = await getSearchMovie(Search, { page });
        } else if (selectedGenre && selectedGenre !== 0) {
          data = await getMoviesByGenre(selectedGenre, { page, sort_by: sortBy });
        } else {
          if (tab === "popular") {
            data = await getPopularMovies({ page, sort_by: sortBy });
          } else if (tab === "top_rated") {
            data = await getTopRatedMovies({ page, sort_by: sortBy });
          } else if (tab === "now_playing") {
            data = await getNowPlayingMovies({ page, sort_by: sortBy });
          } else if (tab === "upcoming") {
            data = await getUpcomingMovies({ page, sort_by: sortBy });
          }
        }
        setMovies(data.results);
        setTotalPages(data.total_pages || 1);
      } catch (err) {
        setError("Failed to fetch movies");
      } finally {
        setloading(false);
      }
    };
    fetchMovies();
  }, [tab, selectedGenre, sortBy, page, Search]);

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    if (!Search.trim()) {
      setError("No Movie Found");
      return;
    }
    setPage(1);
    setSearching(true);
    const fetchSearchResults = async () => {
      try {
        const data = await getSearchMovie(Search, { page: 1 });
        setMovies(data.results);
        setTotalPages(data.total_pages || 1);
      } catch (err) {
        setError("Failed to fetch search results");
      } finally {
        setSearching(false);
      }
    };
    fetchSearchResults();
  };

  // Handle genre change
  const handleGenreChange = (e) => {
    setSelectedGenre(Number(e.target.value));
    setPage(1);
    setSearch("");
  };

  // Handle tab change
  const handleTabChange = (value) => {
    setTab(value);
    setPage(1);
    setSelectedGenre(0);
    setSearch("");
  };

  // Handle sort change
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setPage(1);
  };

  // Pagination controls
  const handlePrevPage = () => setPage((p) => Math.max(1, p - 1));
  const handleNextPage = () => setPage((p) => Math.min(totalPages, p + 1));

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-t from-black to-zinc-800 px-4 py-8">
      <div className="flex flex-col items-center justify-center w-full max-w-2xl">
        <h1 className="text-5xl font-extrabold text-white drop-shadow-[0_0_10px_white] mb-4 text-center animate-fade-in">Welcome to React - Movie</h1>
        <p className="text-2xl text-gray-400 drop-shadow-[0_0_6px_gray] mb-8 text-center animate-fade-in">Find your favorite movies instantly.</p>
        {/* Tabs */}
        <div className="flex gap-4 mb-6 w-full justify-center animate-fade-in">
          {TABS.map((t) => (
            <button
              key={t.value}
              onClick={() => handleTabChange(t.value)}
              className={`px-6 py-2 rounded-2xl font-bold transition-all duration-200 text-lg relative
                ${tab === t.value ? "bg-black text-white shadow-[0_0_20px_white] scale-105" : "bg-black text-white shadow-[0_0_10px_white] hover:bg-white hover:text-black hover:scale-105"}
              `}
            >
              {t.label}
              {tab === t.value && (
                <span className="absolute left-1/2 -translate-x-1/2 bottom-0 h-1 w-2/3 bg-black rounded-full animate-glow" />
              )}
            </button>
          ))}
        </div>
        {/* Search and Sort */}
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-center gap-4 mb-8 w-full animate-fade-in">
          <input
            type="text"
            placeholder="Search for a movie"
            className="bg-black text-white rounded px-4 py-2 focus:ring-2 focus:ring-white focus:shadow-[0_0_20px_white] placeholder:text-white w-full transition-all duration-200"
            value={Search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            type="submit"
            className="bg-black text-white font-bold rounded-2xl shadow-[0_0_10px_white] px-6 py-2 transition hover:bg-white hover:text-black hover:scale-105"
          >
            Search
          </button>
          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={handleSortChange}
            className="bg-black text-white font-bold rounded-2xl shadow-[0_0_10px_white] px-6 py-2 transition focus:ring-2 focus:ring-white focus:shadow-[0_0_20px_white] hover:bg-white hover:text-black"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </form>
        {error && <div className="mb-4 text-pink-400 drop-shadow-[0_0_10px_white] text-lg text-center animate-fade-in">{error}</div>}
      </div>
      {/* Genre Filter Dropdown */}
      <div className="w-full flex justify-center mb-6 animate-fade-in">
        <select
          value={selectedGenre}
          onChange={handleGenreChange}
          className="bg-black text-white font-bold rounded-2xl shadow-[0_0_10px_white] px-6 py-2 transition focus:ring-2 focus:ring-white focus:shadow-[0_0_20px_white] hover:bg-white hover:text-black"
        >
          <option value={0}>All Genres</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>{genre.name}</option>
          ))}
        </select>
      </div>
      {/* Movie Grid */}
      <div className="w-full max-w-7xl mt-4 animate-fade-in">
        <h2 className="text-3xl font-bold text-white drop-shadow-[0_0_10px_white] mb-6 text-center">
          {tab === "popular" && "Popular Movies"}
          {tab === "top_rated" && "Top Rated Movies"}
          {tab === "now_playing" && "Now Playing"}
          {tab === "upcoming" && "Upcoming Movies"}
        </h2>
        {loading || searching ? (
          <div className="text-white/80 drop-shadow-[0_0_6px_gray] text-xl text-center animate-fade-in">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full max-w-7xl">
            {movies.map((movie, idx) => (
              <div className="transition-all duration-300 transform hover:scale-105" key={movie.id} style={{ animationDelay: `${idx * 40}ms` }}>
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-4 mt-8 animate-fade-in">
        <button
          onClick={handlePrevPage}
          disabled={page === 1}
          className={`px-6 py-2 rounded-2xl font-bold transition-all duration-200 text-lg bg-black text-white shadow-[0_0_10px_white] hover:bg-white hover:text-black hover:scale-105 ${page === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          Prev
        </button>
        <span className="text-white text-lg font-bold px-4">Page {page} of {totalPages}</span>
        <button
          onClick={handleNextPage}
          disabled={page === totalPages}
          className={`px-6 py-2 rounded-2xl font-bold transition-all duration-200 text-lg bg-black text-white shadow-[0_0_10px_white] hover:bg-white hover:text-black hover:scale-105 ${page === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          Next
        </button>
      </div>
      {/* Footer */}
      <footer className="w-full flex flex-col items-center justify-center mt-12 mb-2 animate-fade-in">
        <div className="text-white/80 drop-shadow-[0_0_10px_white] text-center text-lg">
          Made by <span className="font-bold text-white">Jeevan Baabu Murugan</span> ·
          <a href="https://github.com/therealgone" target="_blank" rel="noopener noreferrer" className="ml-2 underline hover:text-blue-400">GitHub</a> ·
          <a href="https://www.linkedin.com/in/jeevan-baabu-97a19125b" target="_blank" rel="noopener noreferrer" className="ml-2 underline hover:text-blue-400">LinkedIn</a>
        </div>
      </footer>
    </div>
  );
}
export default Home;
