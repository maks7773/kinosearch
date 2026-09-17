import { Link } from "react-router-dom";

function Header({ query, setQuery, searchMovies}) {
  

  return (
    <header>
      <h1>KinoSearch</h1>
      <div className="search-block">
        <input value={query} onChange={(e) => setQuery(e.target.value)} />
        <button onClick={searchMovies}>Искать</button>
      </div>
      <Link to="/favorites" className="favorites-link">❤️ Избранное</Link>
    </header>
  );
}

export default Header;
