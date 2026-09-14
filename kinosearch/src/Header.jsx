function Header({ query, setQuery, searchMovies}) {
  

  return (
    <header>
      <h1>KinoSearch</h1>
      <div className="search-block">
        <input value={query} onChange={(e) => setQuery(e.target.value)} />
        <button onClick={searchMovies}>Искать</button>
      </div>
      <button>Войти</button>
    </header>
  );
}

export default Header;
