function MovieCard({ movie }) {
  return (
    <div className="card">
      <img className="poster" src={movie.Poster} alt={movie.Title} />
      <h2 className="title">{movie.Title}</h2>
      <p className="year">{movie.Year}</p>
    </div>
  );
}

export default MovieCard;