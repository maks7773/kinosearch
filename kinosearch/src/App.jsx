import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import MovieDetails from "./MovieDetails";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/movie/:id" element={<MovieDetails />}/>
    </Routes>
  );
}

export default App;
