import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TMDB_IMAGE_BASE_URL, PLACEHOLDER_IMAGE } from '../../utils/constants';
import { toggleWatchlist, isInWatchlist } from '../../api/watchlist';

// TV Show Card Component
const TVShowCard = ({ show, showWatchlistButton = true }) => {
  const [isInWatchlistState, setIsInWatchlistState] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setIsInWatchlistState(isInWatchlist(show.id, 'tv'));
  }, [show.id]);

  const handleToggleWatchlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    toggleWatchlist(show, 'tv');
    setIsInWatchlistState(!isInWatchlistState);
  };

  const posterUrl = show.poster_path 
    ? `${TMDB_IMAGE_BASE_URL}${show.poster_path}`
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
      to={`/tv/${show.id}`} 
      className="block group perspective-1000"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl overflow-hidden transition-all duration-500 ease-out group-hover:shadow-2xl group-hover:shadow-blue-500/25 group-hover:-translate-y-3 group-hover:scale-105 transform-gpu">
        {/* Animated border gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl p-0.5">
          <div className="bg-white rounded-2xl h-full w-full"></div>
        </div>
        
        <div className="relative z-10">
          {/* Poster Image Container */}
          <div className="relative overflow-hidden">
            <img
              src={posterUrl}
              alt={show.name}
              className="w-full h-80 object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
              loading="lazy"
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Rating Badge */}
            {show.vote_average && (
              <div className="absolute top-3 right-3 transform transition-all duration-500 group-hover:scale-110">
                <div className={`bg-gradient-to-r ${getRatingColor(show.vote_average)} p-0.5 rounded-full shadow-lg`}>
                  <div className="bg-white/95 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center space-x-1">
                    <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-sm font-bold text-gray-800">
                      {show.vote_average.toFixed(1)}
                    </span>
                  </div>
                </div>
                {/* Rating tooltip */}
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200">
                  <div className="bg-gray-900/90 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-md whitespace-nowrap">
                    {getRatingText(show.vote_average)}
                  </div>
                </div>
              </div>
            )}

            {/* Watchlist Button */}
            {showWatchlistButton && (
              <button
                onClick={handleToggleWatchlist}
                className={`absolute top-3 left-3 p-2.5 rounded-full transition-all duration-300 transform group-hover:scale-110 backdrop-blur-sm ${
                  isInWatchlistState 
                    ? 'bg-red-500/90 text-white shadow-lg shadow-red-500/50' 
                    : 'bg-white/20 text-white hover:bg-white/30 shadow-lg'
                }`}
              >
                <svg className="w-5 h-5" fill={isInWatchlistState ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            )}

            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-50 group-hover:scale-100">
              <div className="bg-white/20 backdrop-blur-md rounded-full p-4 shadow-2xl border border-white/30">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832L14 10.202a1 1 0 000-1.664l-4.445-2.37z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>

          {/* Card Content */}
          <div className="p-5 bg-gradient-to-b from-white to-gray-50/50">
            {/* Show Title */}
            <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors duration-300">
              {show.name}
            </h3>
            
            {/* First Air Date and Info */}
            <div className="flex items-center justify-between">
              <p className="text-gray-600 text-sm font-medium">
                {show.first_air_date ? new Date(show.first_air_date).getFullYear() : 'N/A'}
              </p>
              
              {/* Quick Info */}
              <div className="flex items-center space-x-2">
                {show.vote_count && (
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    {show.vote_count.toLocaleString()} votes
                  </span>
                )}
              </div>
            </div>
            
            {/* View Details indicator */}
            <div className={`flex items-center space-x-1 text-sm font-medium mt-3 transition-all duration-300 ${
              isHovered ? 'text-teal-600 translate-x-1' : 'text-gray-500'
            }`}>
              <span>View Details</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TVShowCard;