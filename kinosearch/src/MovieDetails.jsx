import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./MovieDetails.css";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    async function loadMovie() {
      try {
        const response = await fetch(
          `http://www.omdbapi.com/?apikey=df0fd343&i=${id}`,
        );
        const data = await response.json();
        setMovie(data);

        const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        const isInFavorites = favorites.some((fav) => fav.imdbID === id);
        setIsFavorite(isInFavorites);
      } catch (error) {
        setError("Something wrong");
      } finally {
        setLoading(false);
      }
    }
    loadMovie();
  }, []);

  function toggleFavorite() {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    
    if (isFavorite) {
      const newFavorites = favorites.filter((fav) => fav.imdbID !== id);
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      setIsFavorite(false)
    } else {
      const newFavorite = {
        imdbID: movie.imdbID,
        Title: movie.Title,
        Poster: movie.Poster,
        Year: movie.Year
      };
      favorites.push(newFavorite);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      setIsFavorite(true);
    }
  }

  return (
    <div>
      <Link to="/" className="back-link">
        ← Назад к поиску
      </Link>
      {loading && <div className="loading">Loading... ✌️</div>}
      {error && <div className="error">{error}</div>}
      {movie && (
        <div className="page">
          <div className="main-movie-block">
            <img src={movie.Poster} alt={movie.Title} className="page-poster" />
          </div>
          <div className="dop-movie-block">
            <h1 className="movie-title">{movie.Title}</h1>
            <div className="imdb-rating">{movie.imdbRating}</div>
            <button onClick={toggleFavorite} className="favorite-btn">{isFavorite ? "💔 Удалить из избранного" : "❤️ Добавить в избранное"}</button>
            <p>
              <strong>Genre</strong>
              {movie.Genre}
            </p>
            <p>
              <strong>Year</strong>
              {movie.Year}
            </p>
            <p>
              <strong>Country</strong>
              {movie.Country}
            </p>
            <p>
              <strong>Director</strong>
              {movie.Director}
            </p>
            <p>
              <strong>Actors</strong>
              {movie.Actors}
            </p>
            <p>
              <strong>Plot</strong>
              {movie.Plot}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default MovieDetails;
