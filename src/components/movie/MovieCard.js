import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TMDB_IMAGE_BASE_URL, PLACEHOLDER_IMAGE } from '../../utils/constants';
import { toggleWatchlist, isInWatchlist } from '../../api/watchlist';

// Enhanced Mobile-Responsive Movie Card Component
const MovieCard = ({ movie, showWatchlistButton = true }) => {
  const [isInWatchlistState, setIsInWatchlistState] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    setIsInWatchlistState(isInWatchlist(movie.id, 'movie'));
  }, [movie.id]);

  const handleToggleWatchlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    toggleWatchlist(movie, 'movie');
    setIsInWatchlistState(!isInWatchlistState);
    
    // Haptic feedback for mobile devices
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }
  };

  const posterUrl = movie.poster_path 
    ? `${TMDB_IMAGE_BASE_URL}${movie.poster_path}`
    : PLACEHOLDER_IMAGE;

  const getRatingColor = (rating) => {
    if (rating >= 8) return 'from-green-400 to-emerald-600';
    if (rating >= 7) return 'from-yellow-400 to-orange-500';
    if (rating >= 6) return 'from-orange-400 to-red-500';
    return 'from-red-400 to-red-600';
  };

  const getRatingText = (rating) => {
    if (rating >= 8) return 'Excellent';
    if (rating >= 7) return 'Good';
    if (rating >= 6) return 'Fair';
    return 'Poor';
  };

  return (
    <Link 
      to={`/movie/${movie.id}`} 
      className="block group perspective-1000"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative bg-gradient-to-br from-white to-gray-50 rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl overflow-hidden transition-all duration-300 sm:duration-500 ease-out group-hover:shadow-xl sm:group-hover:shadow-2xl group-hover:shadow-blue-500/25 group-hover:-translate-y-1 sm:group-hover:-translate-y-3 group-hover:scale-[1.02] sm:group-hover:scale-105 transform-gpu">
        
        {/* Animated border gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-teal-500/20 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
        
        {/* Backdrop overlay for enhanced depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent rounded-xl sm:rounded-2xl"></div>
        
        {/* Image container with enhanced effects */}
        <div className="relative overflow-hidden">
          {/* Shimmer loading effect */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse"></div>
          )}
          
          <img
            src={posterUrl}
            alt={movie.title}
            className={`w-full h-64 sm:h-72 md:h-80 object-cover transition-all duration-500 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            } ${isHovered ? 'scale-110' : 'scale-100'}`}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
          />
          
          {/* Enhanced rating badge */}
          {movie.vote_average && (
            <div className="absolute top-2 sm:top-3 right-2 sm:right-3 group">
              <div className={`px-2 sm:px-3 py-1 sm:py-1.5 bg-gradient-to-r ${getRatingColor(movie.vote_average)} text-white text-xs sm:text-sm font-bold rounded-full shadow-lg backdrop-blur-sm transition-all duration-300 transform group-hover:scale-110`}>
                {movie.vote_average.toFixed(1)}
              </div>
              {/* Tooltip */}
              <div className="absolute -bottom-8 right-0 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-10">
                {getRatingText(movie.vote_average)}
              </div>
            </div>
          )}
          
          {/* Enhanced watchlist button */}
          {showWatchlistButton && (
            <button
              onClick={handleToggleWatchlist}
              className={`absolute top-2 sm:top-3 left-2 sm:left-3 p-2 sm:p-2.5 rounded-full transition-all duration-300 transform hover:scale-110 active:scale-95 backdrop-blur-sm shadow-lg ${
                isInWatchlistState 
                  ? 'bg-red-500/90 text-white shadow-red-500/30' 
                  : 'bg-black/50 text-white hover:bg-black/70 shadow-black/30'
              }`}
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill={isInWatchlistState ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          )}
          
          {/* Play button overlay */}
          <div className={`absolute inset-0 bg-black/30 flex items-center justify-center transition-all duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}>
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/90 rounded-full flex items-center justify-center shadow-xl transform transition-all duration-300 hover:scale-110 backdrop-blur-sm">
              <svg className="w-6 h-6 sm:w-8 sm:h-8 text-gray-800 ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Enhanced content section */}
        <div className="p-3 sm:p-4 md:p-5 space-y-2 sm:space-y-3 relative">
          {/* Gradient background for content */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-50/50 to-transparent rounded-b-xl sm:rounded-b-2xl"></div>
          
          <div className="relative">
            {/* Enhanced title */}
            <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 mb-1 sm:mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
              {movie.title}
            </h3>
            
            {/* Enhanced year and rating */}
            <div className="flex items-center justify-between text-xs sm:text-sm text-gray-600 mb-2">
              <span className="font-medium">
                {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
              </span>
              {movie.vote_average && (
                <div className="flex items-center space-x-1">
                  <div className="flex space-x-0.5">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full ${
                          i < Math.floor(movie.vote_average / 2) 
                            ? 'bg-yellow-400' 
                            : 'bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* View Details indicator */}
            <div className={`flex items-center space-x-1 text-xs sm:text-sm font-medium transition-all duration-300 ${
              isHovered ? 'text-teal-600 translate-x-1' : 'text-gray-500'
            }`}>
              <span>View Details</span>
              <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;