import { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import Header from "./Header";
import Footer from "./Footer";
import "./App.css";
import { Routes, Route } from "react-router-dom";

function HomePage() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function loadRandomMovies() {
    setLoading(true);
    setError(null);

    try {
      const searchWords = [
        "action",
        "comedy",
        "drama",
        "horror",
        "thriller",
        "fantasy",
        "adventure",
        "sci-fi",
      ];

      const requests = searchWords.map(async (word) => {
        const randomPage = Math.floor(Math.random() * 5) + 1;

        const response = await fetch(
          `https://www.omdbapi.com/?apikey=df0fd343&s=${word}&page=${randomPage}`,
        );

        const data = await response.json();

        return data.Search || [];
      });

      const results = await Promise.all(requests);

      const allMovies = results.flat();

      const shuffledMovies = allMovies.sort(() => Math.random() - 0.5);

      setMovies(shuffledMovies.slice(0, 20));
    } catch (error) {
      setError("something wrong");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadRandomMovies();
  }, []);

  async function searchMovies() {
    if (query.trim() === "") {
      setError("Введите название фильма!");
      return;
    }

    setError(null);
    setLoading(true);
    try {
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=df0fd343&s=${query}`,
      );
      const data = await response.json();

      if (data.Search) {
        setMovies(data.Search);
        console.log(movies);
      } else {
        setMovies([]);
        setError(data.Error || "Ничего не найдено");
      }
    } catch (error) {
      setError("Something wrong");
    } finally {
      setLoading(false);
    }
  }

  function sortByNew() {
    const sortedMovies = [...movies].sort(
      (a, b) => Number(b.Year) - Number(a.Year),
    );
    setMovies(sortedMovies);
  }

  function sortByOld() {
    const sortedMovies = [...movies].sort(
      (a, b) => Number(a.Year) - Number(b.Year),
    );
    setMovies(sortedMovies);
  }

  return (
    <div>
      <Header query={query} setQuery={setQuery} searchMovies={searchMovies} />
      {loading && <div className="loading">Loading... ✌️</div>}
      {error && <div className="error">{error}</div>}
      <div className="filters">
        <button onClick={() => sortByNew()}>Сначала новые</button>
        <button onClick={() => sortByOld()}>Сначала старые</button>
      </div>

      <div className="movies-grid">
        {movies.map((movie, index) => (
          <MovieCard key={index} movie={movie} />
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default HomePage;
