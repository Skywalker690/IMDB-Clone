import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchMovieDetails, fetchSimilarMovies } from '../../api/tmdb';
import { TMDB_IMAGE_BASE_URL, TMDB_BACKDROP_BASE_URL, PLACEHOLDER_IMAGE } from '../../utils/constants';
import { toggleWatchlist, isInWatchlist } from '../../api/watchlist';
import Header from '../header/Header';
import MovieCard from './MovieCard';

// Movie Details Component
const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [trailers, setTrailers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isInWatchlistState, setIsInWatchlistState] = useState(false);
  
  // Similar movies infinite scroll state
  const [similarMovies, setSimilarMovies] = useState([]);
  const [similarMoviesPage, setSimilarMoviesPage] = useState(1);
  const [loadingSimilar, setLoadingSimilar] = useState(false);
  const [hasMoreSimilar, setHasMoreSimilar] = useState(true);

  useEffect(() => {
    const fetchMovieDetailsData = async () => {
      try {
        setLoading(true);
        const { movie, cast, trailers } = await fetchMovieDetails(id);
        
        setMovie(movie);
        setCast(cast);
        setTrailers(trailers);
        
        // Check if movie is in watchlist
        setIsInWatchlistState(isInWatchlist(parseInt(id), 'movie'));
        
        // Reset similar movies state when movie changes
        setSimilarMovies([]);
        setSimilarMoviesPage(1);
        setHasMoreSimilar(true);
        
        // Fetch first page of similar movies
        fetchSimilarMoviesData(1, true);
      } catch (error) {
        console.error('Error fetching movie details:', error);
        // Fallback to mock data
        setMovie({
          id: parseInt(id),
          title: "Sample Movie",
          overview: "This is a sample movie description. The actual movie data could not be loaded.",
          poster_path: null,
          backdrop_path: null,
          release_date: "2024-01-01",
          vote_average: 7.5,
          genres: [{ id: 1, name: "Drama" }],
          runtime: 120
        });
        setCast([
          { id: 1, name: "Actor One", character: "Main Character", profile_path: null },
          { id: 2, name: "Actor Two", character: "Supporting Character", profile_path: null }
        ]);
        setTrailers([]);
      } finally {
        setLoading(false);
      }
    };

    // Auto-scroll to top when component loads
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    fetchMovieDetailsData();
  }, [id]);

  const fetchSimilarMoviesData = async (page = 1, reset = false) => {
    if (loadingSimilar || (!hasMoreSimilar && !reset)) return;
    
    try {
      setLoadingSimilar(true);
      const response = await fetchSimilarMovies(id, page);
      
      const newMovies = response.results;
      
      if (reset) {
        setSimilarMovies(newMovies);
      } else {
        setSimilarMovies(prev => [...prev, ...newMovies]);
      }
      
      setHasMoreSimilar(page < response.total_pages && page < 5); // Limit to 5 pages
      setSimilarMoviesPage(page + 1);
    } catch (error) {
      console.error('Error fetching similar movies:', error);
      // Fallback to mock similar movies
      if (reset) {
        setSimilarMovies([
          {
            id: Math.random() * 1000,
            title: "Similar Movie 1",
            poster_path: null,
            vote_average: 7.2,
            release_date: "2024-01-01"
          },
          {
            id: Math.random() * 1000,
            title: "Similar Movie 2", 
            poster_path: null,
            vote_average: 6.8,
            release_date: "2023-12-15"
          }
        ]);
      }
      setHasMoreSimilar(false);
    } finally {
      setLoadingSimilar(false);
    }
  };

  // Infinite scroll handler
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 1000) {
        if (hasMoreSimilar && !loadingSimilar) {
          fetchSimilarMoviesData(similarMoviesPage);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasMoreSimilar, loadingSimilar, similarMoviesPage, id]);

  const handleToggleWatchlist = () => {
    toggleWatchlist(movie, 'movie');
    setIsInWatchlistState(!isInWatchlistState);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="animate-pulse">
          <div className="h-96 bg-gray-300"></div>
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2 mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="bg-gray-300 h-96 rounded-lg"></div>
              <div className="lg:col-span-2 space-y-4">
                <div className="h-4 bg-gray-300 rounded"></div>
                <div className="h-4 bg-gray-300 rounded"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Movie Not Found</h1>
          <Link to="/" className="text-teal-600 hover:text-teal-800">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const posterUrl = movie.poster_path 
    ? `${TMDB_IMAGE_BASE_URL}${movie.poster_path}`
    : PLACEHOLDER_IMAGE;

  const backdropUrl = movie.backdrop_path 
    ? `${TMDB_BACKDROP_BASE_URL}${movie.backdrop_path}`
    : null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      {/* Backdrop */}
      {backdropUrl && (
        <div className="relative h-96 bg-gray-900">
          <img
            src={backdropUrl}
            alt={movie.title}
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
        </div>
      )}

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Poster */}
          <div className="lg:col-span-1">
            <img
              src={posterUrl}
              alt={movie.title}
              className="w-full max-w-md mx-auto rounded-lg shadow-lg"
            />
          </div>

          {/* Details */}
          <div className="lg:col-span-2">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {movie.title}
              {movie.release_date && (
                <span className="text-gray-600 font-normal">
                  {' '}({new Date(movie.release_date).getFullYear()})
                </span>
              )}
            </h1>

            <div className="flex items-center space-x-4 mb-6">
              {movie.vote_average && (
                <div className="flex items-center">
                  <span className="text-yellow-500 mr-1">⭐</span>
                  <span className="font-semibold">{movie.vote_average.toFixed(1)}/10</span>
                </div>
              )}
              {movie.runtime && (
                <span className="text-gray-600">{movie.runtime} min</span>
              )}
              <div className="flex space-x-3">
                <button
                  onClick={handleToggleWatchlist}
                  className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                    isInWatchlistState
                      ? 'bg-red-500 text-white hover:bg-red-600'
                      : 'bg-teal-500 text-white hover:bg-teal-600'
                  }`}
                >
                  {isInWatchlistState ? 'Remove from Watchlist' : 'Add to Watchlist'}
                </button>
                {trailers.length > 0 && (
                  <button
                    onClick={() => window.open(`https://www.youtube.com/watch?v=${trailers[0].key}`, '_blank')}
                    className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832L14 10.202a1 1 0 000-1.664l-4.445-2.37z" clipRule="evenodd" />
                    </svg>
                    Watch Trailer
                  </button>
                )}
              </div>
            </div>

            {movie.genres && movie.genres.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {movie.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="px-3 py-1 bg-gray-200 text-gray-800 rounded-full text-sm"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            )}

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
              <p className="text-gray-700 leading-relaxed">
                {movie.overview || 'No overview available.'}
              </p>
            </div>

            {cast.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Top Cast</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {cast.map((actor) => (
                    <div key={actor.id} className="bg-white rounded-lg p-4 shadow">
                      <div className="flex items-center">
                        <img
                          src={
                            actor.profile_path
                              ? `${TMDB_IMAGE_BASE_URL}${actor.profile_path}`
                              : 'https://via.placeholder.com/100x150/1f2937/ffffff?text=No+Image'
                          }
                          alt={actor.name}
                          className="w-16 h-20 object-cover rounded mr-4"
                        />
                        <div>
                          <h3 className="font-semibold text-gray-900">{actor.name}</h3>
                          <p className="text-gray-600 text-sm">{actor.character}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Similar Movies - Endless Exploration Section */}
      {similarMovies.length > 0 && (
        <div className="bg-gradient-to-b from-gray-50 to-gray-100 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 mb-4">
                Recommended Movies
              </h2>
              <p className="text-gray-600 text-lg">
                Continue your journey with similar movies you might love
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-teal-500 mx-auto rounded-full mt-4"></div>
            </div>

            {/* Similar Movies Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8">
              {similarMovies.map((similarMovie, index) => (
                <div 
                  key={`${similarMovie.id}-${index}`}
                  className="opacity-0 animate-fade-in-up"
                  style={{ 
                    animationDelay: `${(index % 12) * 0.1}s`,
                    animationFillMode: 'forwards'
                  }}
                >
                  <MovieCard movie={similarMovie} showWatchlistButton={true} />
                </div>
              ))}
            </div>

            {/* Loading Similar Movies */}
            {loadingSimilar && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8 mt-8">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="movie-card-skeleton">
                    <div className="h-80 bg-gray-200 mb-4"></div>
                    <div className="p-5">
                      <div className="h-6 bg-gray-200 rounded mb-2 w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* End Message */}
            {!hasMoreSimilar && !loadingSimilar && similarMovies.length > 0 && (
              <div className="text-center mt-12">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">You've reached the end!</h3>
                <p className="text-gray-600 mb-6">
                  You've explored all similar movies for "{movie.title}". 
                </p>
                <Link
                  to="/"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-teal-500 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-teal-600 transition-all duration-300 transform hover:scale-105"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  Discover More Movies
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;