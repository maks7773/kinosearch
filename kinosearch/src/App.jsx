import { useState } from "react";
import MovieCard from "./MovieCard";
import Header from "./Header"
import Footer from "./Footer";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  async function searchMovies() {
    const response = await fetch(
      `http://www.omdbapi.com/?i=tt3896198&apikey=df0fd343&s=${query}`,
    );
    const data = await response.json();
    console.log(data);
    if (data.Search) {
      setMovies(data.Search);
    } else {
      setMovies([]);
    }
  }

  return (
    <div>
      <Header query={query} setQuery={setQuery} searchMovies={searchMovies}/>
      <div className="movies-grid">
        {movies.map((movie, index) => (
          <MovieCard key={index} movie={movie}/>
        ))}
      </div>
      <Footer/>
    </div>
  );
}

export default App;
