import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./MovieDetails.css";
 
function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
 
  useEffect(() => {
    async function loadMovie() {
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=df0fd343&i=${id}`,
      );
      const data = await response.json();
      setMovie(data);
      console.log(data);
    }
    loadMovie();
  }, []);
 
  return (
    <div>
      {movie && (
        <div className="page">
          <div className="main-movie-block">
            <img src={movie.Poster} alt={movie.Title} className="page-poster" />
          </div>
          <div className="dop-movie-block">
            <h1 className="title">{movie.Title}</h1>
            <div className="imdb-rating">{movie.imdbRating}</div>
            <p><strong>Genre</strong>{movie.Genre}</p>
            <p><strong>Year</strong>{movie.Year}</p>
            <p><strong>Country</strong>{movie.Country}</p>
            <p><strong>Director</strong>{movie.Director}</p>
            <p><strong>Actors</strong>{movie.Actors}</p>
            <p><strong>Plot</strong>{movie.Plot}</p>
          </div>
        </div>
      )}
    </div>
  );
}
 
export default MovieDetails;
 