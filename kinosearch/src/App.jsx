import { useState } from "react";
import MovieCard from "./MovieCard";
import Header from "./Header";
import Footer from "./Footer";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null)

  async function searchMovies() {
    setError(null)
    setLoading(true);
        try {
      const response = await fetch(
        `http://www.omdbapi.com/?i=tt3896198&apikey=df0fd343&s=${query}`,
      );
      const data = await response.json();
      if (data.Search) {
        setMovies(data.Search);
      } else {
        setMovies([]);
        setError(data.Error || "Ничего не найдено");
      }
    } catch (error) {
      setError("Something wrong")
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <Header query={query} setQuery={setQuery} searchMovies={searchMovies} />
      {loading && <div className="loading">Loading... ✌️</div>}
      {error && <div className="error">{error}</div>}
      <div className="movies-grid">
        {movies.map((movie, index) => (
          <MovieCard key={index} movie={movie} />
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default App;
