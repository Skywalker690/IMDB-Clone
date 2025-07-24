import { useState, useEffect } from 'react';
import { getWatchlist } from '../api/watchlist';
import Header from '../components/header/Header';
import MovieCard from '../components/movie/MovieCard';
import TVShowCard from '../components/tv/TVShowCard';

// Watchlist Page Component
const Watchlist = () => {
  const [movieWatchlist, setMovieWatchlist] = useState([]);
  const [tvWatchlist, setTvWatchlist] = useState([]);
  const [activeTab, setActiveTab] = useState('movies');

  useEffect(() => {
    const savedMovieWatchlist = getWatchlist('movie');
    const savedTvWatchlist = getWatchlist('tv');
    setMovieWatchlist(savedMovieWatchlist);
    setTvWatchlist(savedTvWatchlist);
  }, []);

  // Listen for storage changes to update watchlist in real-time
  useEffect(() => {
    const handleStorageChange = () => {
      const savedMovieWatchlist = getWatchlist('movie');
      const savedTvWatchlist = getWatchlist('tv');
      setMovieWatchlist(savedMovieWatchlist);
      setTvWatchlist(savedTvWatchlist);
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for custom events for same-page updates
    const handleWatchlistChange = () => {
      const savedMovieWatchlist = getWatchlist('movie');
      const savedTvWatchlist = getWatchlist('tv');
      setMovieWatchlist(savedMovieWatchlist);
      setTvWatchlist(savedTvWatchlist);
    };

    // Polling approach to check for changes
    const interval = setInterval(handleWatchlistChange, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const isEmpty = movieWatchlist.length === 0 && tvWatchlist.length === 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">My Watchlist</h1>
        
        {!isEmpty ? (
          <>
            {/* Tabs - Enhanced for mobile */}
            <div className="flex border-b border-gray-200 mb-6 sm:mb-8 overflow-x-auto">
              <button
                onClick={() => setActiveTab('movies')}
                className={`px-4 sm:px-6 py-3 font-semibold text-sm border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === 'movies'
                    ? 'border-teal-500 text-teal-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Movies ({movieWatchlist.length})
              </button>
              <button
                onClick={() => setActiveTab('tv')}
                className={`px-4 sm:px-6 py-3 font-semibold text-sm border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === 'tv'
                    ? 'border-teal-500 text-teal-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                TV Shows ({tvWatchlist.length})
              </button>
            </div>

            {/* Content */}
            {activeTab === 'movies' && (
              <>
                {movieWatchlist.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
                    {movieWatchlist.map((movie) => (
                      <MovieCard key={movie.id} movie={movie} showWatchlistButton={true} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 sm:py-12">
                    <p className="text-gray-500 text-base sm:text-lg">No movies in your watchlist yet.</p>
                  </div>
                )}
              </>
            )}

            {activeTab === 'tv' && (
              <>
                {tvWatchlist.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
                    {tvWatchlist.map((show) => (
                      <TVShowCard key={show.id} show={show} showWatchlistButton={true} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 sm:py-12">
                    <p className="text-gray-500 text-base sm:text-lg">No TV shows in your watchlist yet.</p>
                  </div>
                )}
              </>
            )}
          </>
        ) : (
          <div className="text-center py-8 sm:py-12">
            <div className="max-w-md mx-auto px-4">
              <svg className="w-16 h-16 sm:w-24 sm:h-24 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">Your watchlist is empty</h2>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                Start adding movies and TV shows to your watchlist by clicking the heart icon on any card.
              </p>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 justify-center">
                <a
                  href="/movies"
                  className="inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 border border-transparent text-sm sm:text-base font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 transition-colors"
                >
                  Browse Movies
                </a>
                <a
                  href="/tv"
                  className="inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 border border-transparent text-sm sm:text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                >
                  Browse TV Shows
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Watchlist;