import { Link } from "react-router-dom";

function Header({ query, setQuery, searchMovies }) {

  function clearSearch() {
    setQuery("")
  }

  return (
    <header>
      <h1>KinoSearch</h1>
      <div className="search-block">
        <input
          value={query}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              console.log("ENTER!");
              searchMovies();
            }
          }}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={clearSearch}>×</button>
        <button onClick={searchMovies}>Искать</button>
      </div>
      <Link to="/favorites" className="favorites-link">
        ❤️ Избранное
      </Link>
    </header>
  );
}

export default Header;
