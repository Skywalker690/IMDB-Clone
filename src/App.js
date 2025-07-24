import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, Movies, TVShows, SearchResults, Watchlist } from "./pages";
import { MovieDetails, TVShowDetails } from "./components";



// Main App Component
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/tv" element={<TVShows />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/tv/:id" element={<TVShowDetails />} />
          <Route path="/watchlist" element={<Watchlist />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;