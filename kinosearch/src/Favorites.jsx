import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import { Link } from "react-router-dom";
import "./Favorites.css";

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(saved);
  }, []);

  return (
    <div className="favorites-page">
      <Link to="/" className="back-link">
        ← Назад к поиску
      </Link>
      <h1>❤️ Избранное</h1>
      {favorites.length === 0 ? (
        <p className="empty-message">Пока ничего не добавлено</p>
      ) : (
        <div className="movies">
          {favorites.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;
