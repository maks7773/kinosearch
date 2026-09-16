import { Link } from "react-router-dom";

function MovieCard({ movie }) {
  return (
    <Link to={`/movie/${movie.imdbID}`}>
      <div className="card">
        {movie.Poster !== "N/A" ? (
          <img className="poster" src={movie.Poster} alt={movie.Title} />
        ) : (
          <div>No poster</div>
        )}
        <h2 className="title">{movie.Title}</h2>
        <p className="year">{movie.Year}</p>
      </div>
    </Link>
  );
}

export default MovieCard;
